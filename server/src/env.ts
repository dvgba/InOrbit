import z from 'zod'

const envSchema = z.object({
    POSTGRES_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
