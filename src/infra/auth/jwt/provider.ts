import { AsyncEither, left, right } from '@core/logic/Either'
import { UnauthorizedError } from '@application/errors/unauthorized-error'
import { IAuthProvider } from '..'
import { JwtHelper } from '.'

export class JwtAuthProvider implements IAuthProvider {
  async generateCredentials(payload: Record<string, unknown>) {
    const token = await JwtHelper.sign(payload)

    return { token }
  }

  async validateCredentials(
    credentials: unknown,
  ): AsyncEither<UnauthorizedError, unknown> {
    try {
      const result = await JwtHelper.verify(credentials as string)
      return right(result)
    } catch (error) {
      return left(new UnauthorizedError(error))
    }
  }
}
