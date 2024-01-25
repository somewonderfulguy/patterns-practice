type Callback<TMessageType> = (message: TMessageType) => void

class ObserverClass<TMessageType> {
  constructor() {}

  private subscribers = new Set<Callback<TMessageType>>()

  subscribe(cb: Callback<TMessageType>) {
    this.subscribers.add(cb)
    return () => {
      this.subscribers.delete(cb)
    }
  }

  publish(message: TMessageType) {
    this.subscribers.forEach((cb) => cb(message))
  }
}

export default ObserverClass
