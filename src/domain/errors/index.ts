export enum ErrorCodes {
  VALIDATION_ERROR,
  NOT_FOUND_ERROR,
}

export interface DomainError {
  message: string
  code: ErrorCodes
}
