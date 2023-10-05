import { ErrorCodes } from '@domain/errors'

export const StatusErrorCodeMapper = {
  [ErrorCodes.VALIDATION_ERROR]: 422,
  [ErrorCodes.NOT_FOUND_ERROR]: 404,
}
