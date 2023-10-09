import * as awilix from 'awilix'
import { type Constructor } from 'awilix'
import * as UserUseCases from '@application/use-cases/user'
import { type AsInstances } from '@core/logic/AsInstances'
import * as PrismaRepositories from './database/prisma/repositories'
import { mapObject } from '@core/utils'
import { prismaClient } from './database/prisma/prisma.service'
import { PrismaClient } from '@prisma/client'
import { IAuthProvider } from './auth'
import { JwtAuthProvider } from './auth/jwt'

type IDiContainer = {
  prisma: PrismaClient
  authProvider: IAuthProvider
} & AsInstances<typeof UserUseCases>

export const diContainer = awilix.createContainer<IDiContainer>({
  injectionMode: 'PROXY',
})

diContainer.register({
  prisma: awilix.asValue(prismaClient),
  authProvider: awilix.asClass(JwtAuthProvider),

  ...mapObject(UserUseCases, (clsName, cls) => [
    clsName,
    awilix.asClass(cls as Constructor<unknown>).classic(),
  ]),

  ...mapObject(PrismaRepositories, (_clsName, cls) => [
    cls.usedAs,
    awilix.asClass(cls).classic(),
  ]),
})
