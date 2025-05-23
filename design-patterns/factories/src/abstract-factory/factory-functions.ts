interface Logger {
  info(message: string): void
  warn(message: string): void
  debug(message: string): void
  error(message: string): void
}

const productionLogger = (): Logger => ({
  info(message: string) {},
  warn(message: string) {
    console.warn(message)
  },
  debug(message: string) {},
  error(message: string) {
    console.error(message)
  }
})

const developmentLogger = (): Logger => ({
  info(message: string) {
    console.info(message)
  },
  warn(message: string) {
    console.warn(message)
  },
  debug(message: string) {
    console.debug(message)
  },
  error(message: string) {
    console.error(message)
  }
})

export const createLogger = (): Logger => {
  if (process.env.NODE_ENV === 'production') {
    return productionLogger()
  } else {
    return developmentLogger()
  }
}
