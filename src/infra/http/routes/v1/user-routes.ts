import { type FastifyInstance } from 'fastify'
import { diContainer } from '@infra/diConfig'
import { defaultHandler } from '../default-handler'

export const userRoutes = (server: FastifyInstance) => {
  server.post('/user', async (...params) => {
    await defaultHandler(diContainer.cradle.CreateUserUseCase, ...params)
  })

  server.post('/login', async (...params) => {
    await defaultHandler(diContainer.cradle.LoginUseCase, ...params)
  })
}
