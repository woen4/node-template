import { StatusErrorCodeMapper } from './status-error-code-mapper'
import { IUseCase } from '@application/types'
import { Context } from 'hono'

export const defaultHandler = (useCase: IUseCase) => {
  return async function (ctx: Context) {
    const requestPayload = { ...(await ctx.req.json()), ...ctx.req.query() }

    const response = await useCase.handle(requestPayload)

    if (response.isLeft())
      return ctx.json(
        response.value,
        StatusErrorCodeMapper[response.value.code],
      )

    return ctx.json(response.value, 200)
  }
}
