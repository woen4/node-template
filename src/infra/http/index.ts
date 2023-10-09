import { cors } from 'hono/cors'
import { errorHandler } from './exception-handler'
import 'dotenv/config'
import { registerRoutes } from './routes'
/* import { authMiddleware } from '@infra/auth/auth.middleware' */
import { Hono } from 'hono'
import { secureHeaders } from 'hono/secure-headers'
import { logger } from 'hono/logger'
import { authMiddleware } from '@infra/auth/auth.middleware'

export function getApp() {
  const app = new Hono({})

  app.use('*', logger())

  app.use(
    cors({
      origin: '*',
      credentials: true,
      allowMethods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      allowHeaders: [
        'Origin',
        'X-Requested-With',
        'Accept',
        'Content-Type',
        'Authorization',
      ],
      exposeHeaders: [
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Methods',
        'Access-Control-Allow-Headers',
      ],
    }),
  )

  app.use('*', secureHeaders())
  authMiddleware(app)

  app.onError(errorHandler)

  registerRoutes(app)

  return app
}
