import { PrismaClient } from '@prisma/client'

export const prismaClient = new PrismaClient()
export type PrismaService = typeof prismaClient
