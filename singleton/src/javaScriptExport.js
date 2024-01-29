/**
 * ES2015+ allows us to implement the Singleton pattern to create a global instance
 * of a JavaScript class that is instantiated once. You can expose the Singleton
 * instance through a module export. This makes access to it more explicit and
 * controlled and differentiates it from other global variables. You cannot create
 * a new class instance but can read/modify the instance using public get and set
 * methods defined in the class.
 * Osmani, Addy. Learning JavaScript Design Patterns.
 */

// Instance stores a reference to the Singleton class
let instance

// Private methods and variables
const privateMethod = () => {
  console.log('I am private')
}
const privateVariable = 'Im also private'
const randomNumber = Math.random()

class Singleton {
  // Get the Singleton instance if one exists or create one if it doesn't
  constructor() {
    if (!instance) {
      this.publicProperty = 'I am also public'
      instance = this
    }
    return instance
  }

  // Public methods
  publicMethod() {
    console.log('The public can see me!')
  }

  getRandomNumber() {
    return randomNumber
  }
}

export default Singleton
