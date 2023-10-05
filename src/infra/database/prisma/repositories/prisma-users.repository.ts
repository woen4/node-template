import { User } from '@domain/entities/user.entity'
import { UsersRepository } from '@infra/database/repositories/users.repository'
import { PrismaService } from '../prisma.service'
import { UserMapper } from '../mappers/user.mapper'

export class PrismaUserRepository extends UsersRepository {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async create(user: User): Promise<User> {
    console.log(user)
    await this.prisma.user.create({
      data: UserMapper.toPersistence(user),
    })

    return user
  }
}
