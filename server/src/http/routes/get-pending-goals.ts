import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekPendingGoals } from '../../functions/get-week-pending-goals'

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async (
    app,
    _opts
) => {
    app.get('/pendingGoals', async () => {
        const { pendingGoals } = await getWeekPendingGoals()

        return { pendingGoals }
    })
}
