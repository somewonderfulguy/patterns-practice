const observerFunction = <TMessageType>() => {
  type Callback = (message: TMessageType) => void
  const subscribers = new Set<Callback>()

  return {
    subscribe: (cb: Callback) => {
      subscribers.add(cb)
      return () => {
        subscribers.delete(cb)
      }
    },
    publish: (msg: TMessageType) => {
      subscribers.forEach((cb) => cb(msg))
    }
  }
}

export default observerFunction
