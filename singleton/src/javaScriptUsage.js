import Singleton from './javaScriptExport.js'
import BadSingleton from './javaScriptExportBad.js'

const singleton = new Singleton()
const singleton2 = new Singleton()

console.log('Same instance? ' + (singleton === singleton2))

const badSingleton = new BadSingleton()
const badSingleton2 = new BadSingleton()

console.log('Same instance (bad)? ' + (badSingleton === badSingleton2))
