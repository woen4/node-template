import 'dotenv/config'
import z from 'zod'

export const envVariables = z
  .object({
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string(),
    NODE_ENV: z.union([
      z.literal('production'),
      z.literal('tests'),
      z.literal('development'),
    ]),
    APP_PORT: z.number().optional().default(3333),
    APP_HOST: z.string().optional().default('localhost'),
  })
  .parse(process.env)
