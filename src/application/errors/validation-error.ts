import { DomainError, ErrorCodes } from '@domain/errors'
import { ZodError, ZodIssue } from 'zod'

export class ValidationError implements DomainError {
  message = 'Validation Error'
  code = ErrorCodes.VALIDATION_ERROR
  detail: ZodIssue[]

  constructor(errorPayload: ZodError) {
    this.detail = errorPayload.errors
  }
}
