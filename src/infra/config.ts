import { envVariables } from './env'

const isProduction = () => envVariables.NODE_ENV === 'production'
const isDevelopment = () => envVariables.NODE_ENV === 'development'

const appConfig = {
  host: envVariables.APP_HOST,
  port: envVariables.APP_PORT,
}

const jwtConfig = {
  secret: 'secret',
  algorithm: 'HS512' as const,
}

export { isDevelopment, jwtConfig, isProduction, appConfig }
