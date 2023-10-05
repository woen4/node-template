import { envVariables } from './env'
import type { FastifyLoggerOptions, RawServerBase } from 'fastify'
import type { FastifyBaseLogger, PinoLoggerOptions } from 'fastify/types/logger'

type LoggerOptions =
  | boolean
  | (FastifyLoggerOptions<RawServerBase> & PinoLoggerOptions)
  | FastifyBaseLogger

const isProduction = () => envVariables.NODE_ENV === 'production'
const isDevelopment = () => envVariables.NODE_ENV === 'development'

const loggerConfig: LoggerOptions = {}

const appConfig = {
  host: envVariables.APP_HOST,
  port: envVariables.APP_PORT,
}

const jwtConfig = {
  key: 'secret',
}

export { isDevelopment, jwtConfig, isProduction, loggerConfig, appConfig }
