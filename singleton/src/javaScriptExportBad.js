let instance

class BadSingleton {
  // Always creates a new Singleton instance
  constructor() {
    this.randomNumber = Math.random()
    instance = this
    return instance
  }

  getRandomNumber() {
    return this.randomNumber
  }
}

export default BadSingleton
