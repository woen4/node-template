import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { userRoutes } from './v1/user-routes'

export const appRoutes = (
  server: FastifyInstance,
  options: FastifyPluginOptions,
  done: () => void,
) => {
  userRoutes(server)

  done()
}
