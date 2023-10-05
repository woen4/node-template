import { FastifyInstance } from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { jwtConfig } from '@infra/config'

export const authMiddleware = (app: FastifyInstance) => {
  app.register(fastifyJwt, {
    secret: jwtConfig.key,
  })

  app.addHook('onRequest', async (request, reply) => {
    const ignorePattern = '^/login$'
    const doesntMatchWithIgnorePattern = !request.url.match(ignorePattern)

    try {
      if (doesntMatchWithIgnorePattern) await request.jwtVerify()
    } catch (err) {
      reply.status(401).send({ message: 'Unauthorized operation' })
    }
  })
}
