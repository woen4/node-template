import z from 'zod'
import { AsyncEither, left, right } from '@core/logic/Either'
import { ValidationError } from '../../errors/validation-error'
import { IUseCase, IUseCaseResponse } from '@application/types'
import { UsersRepository } from '@infra/database/repositories/users.repository'
import { User } from '@domain/entities/user.entity'
import { IAuthProvider } from '@infra/auth'

const createUserSchema = z.object({
  name: z.string(),
  email: z.string(),
})

type CreateUserDto = z.infer<typeof createUserSchema>

type CreateUserResponse = AsyncEither<ValidationError, IUseCaseResponse>

export class CreateUserUseCase implements IUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authProvider: IAuthProvider,
  ) {}

  async handle(createUserDto: CreateUserDto): CreateUserResponse {
    const payload = createUserSchema.safeParse(createUserDto)

    if (!payload.success) return left(new ValidationError(payload.error))

    const user = User.create(createUserDto)

    this.authProvider.generateCredentials(createUserDto)

    await this.usersRepository.create(user)

    return right({ message: 'Usuário criado com sucesso' })
  }
}
