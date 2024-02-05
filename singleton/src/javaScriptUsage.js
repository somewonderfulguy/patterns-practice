import Singleton from './javaScriptExport.js'
import BadSingleton from './javaScriptExportBad.js'

const singleton = new Singleton()
const singleton2 = new Singleton()

console.log('Same instance? ' + (singleton === singleton2))

const badSingleton = new BadSingleton()
const badSingleton2 = new BadSingleton()

console.log('Same instance (bad)? ' + (badSingleton === badSingleton2))

/*
// Alternate Singleton implementation

let instance
let count = 0

class Counter {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }
  
  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

// freeze the singleton instance so that it cannot be modified
const singletonCounter = Object.freeze(new Counter());
export default singletonCounter;
*/

/*
// Alternate Singleton implementation 2

let count = 0;

const counter = {
  increment() {
    return ++count;
  },

  decrement() {
    return --count;
  }
};


Object.freeze(counter);
export { counter };
*/
