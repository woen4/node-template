import { fastifyCors } from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import { Secret } from '@fastify/jwt'
import type { AwilixContainer } from 'awilix'
import fastify from 'fastify'
import type { FastifyInstance } from 'fastify'
import { isDevelopment, loggerConfig } from '../config'
import { errorHandler } from './exception-handler'
import 'dotenv/config'
import { appRoutes } from './routes'
import { authMiddleware } from '@infra/auth/auth.middleware'

export type ConfigOverrides = {
  diContainer?: AwilixContainer
  jwtKeys?: {
    public: Secret
    private: Secret
  }
}

export async function getApp(): Promise<FastifyInstance> {
  const app = fastify({
    logger: loggerConfig,
  })

  /* Deals with app security */
  await app.register(fastifyCors, {
    origin: '*',
    credentials: true,
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Accept',
      'Content-Type',
      'Authorization',
    ],
    exposedHeaders: [
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Methods',
      'Access-Control-Allow-Headers',
    ],
  })

  await app.register(
    fastifyHelmet,
    isDevelopment()
      ? {
          contentSecurityPolicy: false,
        }
      : {},
  )
  /*  */

  /* Deals with the API Documentation */
  /* await app.register(fastifySwagger, {
    transform: createJsonSchemaTransform({
      skipList: [
        '/documentation/*',
        '*',
      ],
    }),
    openapi: {
      info: {
        title: 'SampleApi',
        description: 'Sample backend service',
        version: '1.0.0',
      },
      servers: [
        {
          url: `http://${appConfig.host}:${appConfig.port}`,
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
  })

  await app.register(fastifySwaggerUi) */
  /*  */

  /* '/login',
      '/access-token',
      '/refresh-token',
      '/documentation',
      '/documentation/json',
      '/documentation/static/*',
      '/documentation/static/index.html',
      '/documentation/static/swagger-initializer.js',
      '/', */

  app.setErrorHandler(errorHandler)

  /* Dependency Injection */
  /* await app.register(fastifyAwilixPlugin, {
    disposeOnClose: true,
    asyncDispose: true,
    asyncInit: true,
  }) */

  /*  registerDependencies(
    configOverrides.diContainer ?? diContainer,
    {
      app: app,
      logger: app.log,
    },
    dependencyOverrides,
  ) */
  /*  */

  /* Register routings */
  authMiddleware(app)

  app.after(() => {
    app.register(appRoutes)
  })

  return app
}
