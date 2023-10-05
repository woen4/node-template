import { User } from '@domain/entities/user.entity'

export abstract class UsersRepository {
  static usedAs = 'usersRepository'

  abstract create(user: User): Promise<User>
}
