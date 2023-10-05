import { FastifyError, FastifyRequest, FastifyReply } from 'fastify'

export const errorHandler = (
  fastifyError: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  console.error(fastifyError)
  return reply.status(500).send({ message: 'Houve um erro inesperado' })
}
