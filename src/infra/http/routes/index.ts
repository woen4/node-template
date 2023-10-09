import { userRoutes } from './v1/user-routes'
import { Hono } from 'hono'

export const registerRoutes = (app: Hono) => {
  userRoutes(app)
}
