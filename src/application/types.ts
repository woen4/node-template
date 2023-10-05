import { AsyncEither } from '@core/logic/Either'
import { DomainError } from '@domain/errors'

export interface IUseCaseResponse<T = null | unknown> {
  message: string
  data?: T
}

export interface IUseCase {
  handle: (
    payload?: unknown,
    auth?: unknown,
  ) => AsyncEither<DomainError, IUseCaseResponse>
}
