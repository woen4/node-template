import { UnauthorizedError } from '@application/errors/unauthorized-error'
import { AsyncEither } from '@core/logic/Either'

export abstract class IAuthProvider {
  abstract generateCredentials: (
    payload: Record<string, unknown>,
  ) => Promise<unknown>

  abstract validateCredentials: (
    credentials: unknown,
  ) => AsyncEither<UnauthorizedError, unknown>
}
