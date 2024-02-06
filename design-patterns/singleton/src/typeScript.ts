class Singleton {
  private static instance: Singleton

  // private constructor ensures that no instance of Singleton can be created with `new` operator
  private constructor() {}

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton()
    }

    return Singleton.instance
  }

  public someMethod() {}
}

const s1 = Singleton.getInstance()
const s2 = Singleton.getInstance()

if (s1 === s2) {
  console.log('Singleton works, both variables contain the same instance.')
} else {
  console.log('Singleton failed, variables contain different instances.')
}
