import { ErrorHandler } from 'hono'

export const errorHandler: ErrorHandler = (error, ctx) => {
  console.error(error)
  return ctx.json({ message: 'Houve um erro inesperado' }, 500)
}
