import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { deleteGoal } from '../../functions/delete-goal-request'

export const deleteGoalRoute: FastifyPluginAsyncZod = async (app, _opts) => {
    app.delete(
        '/goals/:id',
        {
            schema: {
                params: z.object({
                    id: z.string(),
                }),
            },
        },
        async request => {
            const { id } = request.params

            const result = await deleteGoal({ goalId: id })

            if (result.length === 0) {
                return { status: 'Not Found' }
            }

            return { status: 'Success' }
        }
    )
}
