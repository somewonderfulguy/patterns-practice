type Logger = {
  info(message: string): void
  warn(message: string): void
  debug(message: string): void
  error(message: string): void
}

class ProductionLogger implements Logger {
  info(message: string) {}
  warn(message: string) {
    console.warn(message)
  }
  debug(message: string) {}
  error(message: string) {
    console.error(message)
  }
}

class DevelopmentLogger implements Logger {
  info(message: string) {
    console.info(message)
  }
  warn(message: string) {
    console.warn(message)
  }
  debug(message: string) {
    console.debug(message)
  }
  error(message: string) {
    console.error(message)
  }
}

export class LoggerFactory {
  public static createLogger(): Logger {
    if (process.env.NODE_ENV === 'production') {
      return new ProductionLogger()
    } else {
      return new DevelopmentLogger()
    }
  }
}
