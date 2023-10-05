import { FastifyRequest, FastifyReply } from 'fastify'
import { StatusErrorCodeMapper } from './status-error-code-mapper'
import { IUseCase } from '@application/types'

export const defaultHandler = async (
  useCase: IUseCase,
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  //  @ts-expect-error Body and query can be any type
  const response = await useCase.handle({ ...req.body, ...req.query })

  if (response.isLeft())
    return reply
      .status(StatusErrorCodeMapper[response.value.code])
      .send(response.value)

  return reply.status(200).send(response.value)
}
