import { diContainer } from '@infra/diConfig'
import { defaultHandler } from '../default-handler'
import { Hono } from 'hono'

export const userRoutes = (app: Hono) => {
  app.post('/user', defaultHandler(diContainer.cradle.CreateUserUseCase))

  app.post('/login', defaultHandler(diContainer.cradle.LoginUseCase))
}
