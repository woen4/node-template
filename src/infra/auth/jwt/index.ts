import { jwtConfig } from '@infra/config'
import { sign, verify } from 'hono/jwt'

export * from './provider'

export const JwtHelper = {
  async sign(payload: unknown) {
    return await sign(payload, jwtConfig.secret, jwtConfig.algorithm)
  },
  async verify(token: string) {
    return await verify(token, jwtConfig.secret, jwtConfig.algorithm)
  },
}
