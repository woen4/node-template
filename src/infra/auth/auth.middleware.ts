import { jwtConfig } from '@infra/config'
import { Hono } from 'hono'
import { jwt } from 'hono/jwt'

export const authMiddleware = (app: Hono) => {
  app.use(async (ctx, next) => {
    const ignorePattern = '/login$'
    const doesntMatchWithIgnorePattern = !ctx.req.url.match(ignorePattern)

    try {
      if (doesntMatchWithIgnorePattern)
        await jwt({ secret: jwtConfig.secret, alg: jwtConfig.algorithm })(
          ctx,
          next,
        )
    } catch (err) {
      return ctx.json({ message: 'Unauthorized operation' }, 401)
    }
    await next()
  })
}
