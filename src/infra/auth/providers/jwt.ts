import { jwtConfig } from '@infra/config'
import { IAuthProvider } from '../i-auth-provider'
import { createSigner, createVerifier } from 'fast-jwt'
import { AsyncEither, left, right } from '@core/logic/Either'
import { UnauthorizedError } from '@application/errors/unauthorized-error'

export class JwtAuthProvider implements IAuthProvider {
  signer = createSigner({
    key: jwtConfig.key,
  })

  verifier = createVerifier({
    key: jwtConfig.key,
  })

  async generateCredentials(payload: Record<string, unknown>) {
    const token = this.signer(payload)

    return { token }
  }

  async validateCredentials(
    credentials: unknown,
  ): AsyncEither<UnauthorizedError, unknown> {
    try {
      const result = this.verifier(credentials as string)
      return right(result)
    } catch (error) {
      return left(new UnauthorizedError(error))
    }
  }
}
