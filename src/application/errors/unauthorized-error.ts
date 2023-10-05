import { DomainError, ErrorCodes } from '@domain/errors'

export class UnauthorizedError implements DomainError {
  message = 'Unauthorized Error'
  code = ErrorCodes.VALIDATION_ERROR
  detail: unknown

  constructor(error: unknown) {
    this.detail = error
  }
}
