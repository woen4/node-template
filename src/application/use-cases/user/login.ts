import z from 'zod'
import { AsyncEither, left, right } from '@core/logic/Either'
import { ValidationError } from '../../errors/validation-error'
import { IUseCase, IUseCaseResponse } from '@application/types'
import { IAuthProvider } from '@infra/auth'

const loginSchema = z
  .object({
    email: z.string(),
  })
  .strip()

type LoginDto = z.infer<typeof loginSchema>

type LoginResponse = AsyncEither<ValidationError, IUseCaseResponse>

export class LoginUseCase implements IUseCase {
  constructor(private readonly authProvider: IAuthProvider) {}

  async handle(loginDto: LoginDto): LoginResponse {
    const payload = loginSchema.safeParse(loginDto)

    if (!payload.success) return left(new ValidationError(payload.error))

    const { email } = payload.data

    const credentials = await this.authProvider.generateCredentials({ email })

    return right({ message: 'Usuário logado com sucesso', data: credentials })
  }
}
