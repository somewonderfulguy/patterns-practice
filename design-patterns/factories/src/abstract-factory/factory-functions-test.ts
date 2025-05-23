import { createLogger } from './factory-functions'

const logger = createLogger()

logger.info('info message')
logger.warn('warn message')
logger.debug('debug message')
logger.error('error message')
