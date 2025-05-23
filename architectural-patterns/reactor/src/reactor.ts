// process.nextTick has similar behavior to Promise.resolve().then() or queueMicrotask(),
// but it is **even more eager** — it runs before any other microtasks.

// nextTick and microtasks (like Promise.then or queueMicrotask) run **after the current synchronous operation**,
// but **before** the event loop continues to the next task (even in the same phase).

// The nextTick and microtask queues must be completely flushed
// **before the event loop can proceed** — either to the next task in the current phase or to the next phase entirely.

import { readFileSync } from 'node:fs'

type Phase =
  | 'timers'
  | 'pendingCallbacks'
  | 'idlePrepare'
  | 'poll'
  | 'check'
  | 'close'

type Task = () => void

class Reactor {
  private phases: Record<Phase, Task[]> = {
    // Timers phase:
    // Executes callbacks scheduled by setTimeout() and setInterval()
    timers: [],

    // Pending Callbacks phase:
    // Executes I/O callbacks that were deferred to the next loop iteration
    // (e.g., some system-level operations like TCP errors)
    pendingCallbacks: [],

    // Idle, Prepare phase (internal use in libuv):
    // Used internally to prepare for the poll phase
    // Not typically interacted with directly by developers
    idlePrepare: [],

    // Poll phase:
    // Retrieves new I/O events; executes I/O-related callbacks (e.g., readFile)
    // If the poll queue is empty:
    //   - and there are setImmediate() callbacks → go to check phase
    //   - else if timers are due → go to timers phase
    poll: [],

    // Check phase:
    // Executes callbacks scheduled by setImmediate()
    // This phase always follows the poll phase
    check: [],

    // Close Callbacks phase:
    // Executes close event callbacks (e.g., when a socket or handle is closed)
    close: []
  }

  private nextTickQueue: Task[] = []
  // private microtaskQueue: Task[] = [] // Not used in this example
  private active = false

  enqueue(fn: Task, phase: Phase) {
    this.phases[phase].push(fn)
  }

  nextTick(fn: Task) {
    this.nextTickQueue.push(fn)
  }

  private flushNextTicks() {
    while (this.nextTickQueue.length > 0) {
      const tick = this.nextTickQueue.shift()
      tick?.()
    }
  }

  start() {
    this.active = true
    const phaseNames = Object.keys(this.phases) as Phase[]

    while (this.active && this.hasPending()) {
      for (const phase of phaseNames) {
        const queue = this.phases[phase].splice(0)

        for (const task of queue) {
          task()
          this.flushNextTicks() // simulate process.nextTick behavior
        }
      }
    }
  }

  stop() {
    const phaseNames = Object.keys(this.phases) as Phase[]
    for (const phase of phaseNames) {
      this.phases[phase].splice(0)
    }
    this.active = false
  }

  get isActive(): boolean {
    return this.active
  }

  // Better for performance is to have counter and increment it when enqueueing
  // and decrement it when executing the task, but this is a simple implementation
  private hasPending(): boolean {
    return (
      this.nextTickQueue.length > 0 ||
      (Object.keys(this.phases) as Phase[]).some(
        (phase) => this.phases[phase].length > 0
      )
    )
  }
}

const eventLoop = new Reactor()

const timers = { id: 0 }
const timeouts = new Set<number>()

/**
 * In Node.js instead of number, setTimeout returns a Timeout object.
 * This object has `.unref()` and `ref()` methods to control the behavior of the timer.
 *   - .unref() – "Don’t wait for me". Tells Node: “If this is the only thing left, exit the process anyway.”
 *   - .ref() – "Wait for me". Default. Keeps the event loop alive until the timeout/interval runs.
 * In this example, we are using a simple number to identify the timeout.
 * */
const setTimeoutCustom = (fn: () => void, delay: number) => {
  const id = ++timers.id
  const start = Date.now()

  const check = () => {
    if (!timeouts.has(id)) return
    if (Date.now() - start >= delay) {
      timeouts.delete(id)
      fn()
    } else {
      eventLoop.enqueue(check, 'timers')
    }
  }

  timeouts.add(id)
  eventLoop.enqueue(check, 'timers')
  return id
}

const clearTimeoutCustom = (id: number) => {
  timeouts.delete(id)
}

const setImmediateCustom = (fn: () => void) => {
  eventLoop.enqueue(fn, 'check')
}

const readFile = (
  path: string,
  encoding: BufferEncoding,
  callback: (err: NodeJS.ErrnoException | null, data?: string) => void
) => {
  const read = () => {
    setTimeoutCustom(() => {
      try {
        const data = readFileSync(path, encoding)
        console.log('[phase: poll] readFile callback')
        callback(null, data)
      } catch (error) {
        console.log('[phase: poll] readFile error')
        callback(error as NodeJS.ErrnoException)
      }
    }, 1000)
  }
  eventLoop.enqueue(read, 'poll')
}

readFile('./package.json', 'utf-8', (error, data) => {
  if (error) console.error('[phase: poll]', error)
  else console.log('[phase: poll] File content:', data)
})

// Test: nextTick interrupts timers
setTimeoutCustom(() => {
  console.log('[phase: timers] timeout 1')
  eventLoop.nextTick(() => console.log('[tick] nextTick inside timeout 1'))
}, 0)

setTimeoutCustom(() => {
  console.log('[phase: timers] timeout 2 (after ~3 seconds)')
  console.log('[phase: timers] Stopping event loop')
  eventLoop.stop()
}, 3000)

setTimeoutCustom(() => {
  console.log(
    "[phase: timers] won't execute, because the event loop is stopped"
  )
}, 5000)

const timer = setTimeoutCustom(() => {
  console.log('[phase: timers] Should never execute')
}, 200)

setImmediateCustom(() => {
  console.log('[phase: check] setImmediate callback')
})

const timer2 = setTimeoutCustom(() => {
  console.log('[phase: timers] Should never execute')
}, 200)

clearTimeoutCustom(timer)
clearTimeoutCustom(timer2)

eventLoop.start()
