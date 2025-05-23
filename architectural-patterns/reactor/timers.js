class Reactor {
  #tasks = []
  #active = false

  enqueue(fn) {
    this.#tasks.push(fn)
  }

  start() {
    this.#active = true
    while (this.#active && this.#tasks.length) {
      const tasks = this.#tasks.splice(0)
      for (const task of tasks) task()
    }
  }

  stop() {
    this.#tasks.splice(0)
    this.#active = false
  }

  get active() {
    return this.#active
  }
}

const eventLoop = new Reactor()

const timers = { id: 0 }
const timeouts = new Set()
const intervals = new Set()

const setTimeout = (fn, delay) => {
  const id = ++timers.id
  const start = Date.now()

  const check = () => {
    if (!timeouts.has(id)) return
    if (Date.now() - start >= delay) {
      timeouts.delete(id)
      fn()
    } else {
      eventLoop.enqueue(check)
    }
  }

  timeouts.add(id)
  eventLoop.enqueue(check)
  return id
}

const clearTimeout = (id) => {
  timeouts.delete(id)
}

const setInterval = (fn, interval) => {
  const id = ++timers.id
  let start = Date.now()

  const check = () => {
    if (!intervals.has(id)) return
    if (Date.now() - start >= interval) {
      start = Date.now()
      fn()
    }
    eventLoop.enqueue(check)
  }

  intervals.add(id)
  eventLoop.enqueue(check)
  return id
}

const clearInterval = (id) => {
  intervals.delete(id)
}

const timer = setTimeout(() => {
  console.log('Should never execute')
}, 200)

clearTimeout(timer)

setTimeout(() => {
  console.log('Executed after ~1 second (simulated)')
}, 1000)

setTimeout(() => {
  console.log('Executed after ~3 seconds (simulated)')
  console.log('Stopping event loop')
  eventLoop.stop()
}, 3000)

const intervalId = setInterval(() => {
  console.log('Interval tick 500ms')
}, 500)

setTimeout(() => {
  console.log('Executed after ~2 seconds (simulated)')
  console.log('Stopping interval')
  clearInterval(intervalId)
}, 2000)

eventLoop.start()
