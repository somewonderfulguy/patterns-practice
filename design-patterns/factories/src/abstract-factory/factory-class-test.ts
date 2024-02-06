import { LoggerFactory } from './factory-class'

const logger = LoggerFactory.createLogger()

logger.info('info message')
logger.warn('warn message')
logger.debug('debug message')
logger.error('error message')
