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

const { readFileSync } = require('node:fs')

const readFile = (path, encoding, callback) => {
  const read = () => {
    try {
      const data = readFileSync(path, encoding)
      callback(null, data)
    } catch (error) {
      callback(error)
    }
  }
  eventLoop.enqueue(read)
}

readFile('./io.js', 'utf-8', (error, data) => {
  if (error) console.error(error)
  else console.log('File content:', data)
})

readFile('./unknown.txt', 'utf-8', (error, data) => {
  if (error) console.error(error)
  else console.log('File content:', data)
})

eventLoop.start()
