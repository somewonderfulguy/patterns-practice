class Reactor {
  #tasks = []

  enqueue(fn) {
    this.#tasks.push(fn)
  }

  start() {
    while (this.#tasks.length) {
      const tasks = this.#tasks.splice(0)
      for (const task of tasks) task()
    }
  }
}

const eventLoop = new Reactor()

const setTimeout = (fn, delay) => {
  const start = Date.now()
  let counter = 0
  const check = () => {
    counter++
    if (Date.now() - start >= delay) {
      fn()
      console.log({ counter })
    } else {
      eventLoop.enqueue(check)
    }
  }
  eventLoop.enqueue(check)
}

setTimeout(() => {
  console.log('Executed after ~1 second (simulated)')
}, 1000)

setTimeout(() => {
  console.log('Executed after ~2 seconds (simulated)')
}, 2000)

setTimeout(() => {
  console.log('Executed after ~3 seconds (simulated)')
}, 3000)

eventLoop.start()
