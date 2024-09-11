import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoalCompletionRequest } from '../../functions/create-goal-completion'

export const createCompletionRoute: FastifyPluginAsyncZod = async (
    app,
    _opts
) => {
    app.post(
        '/completions',
        {
            schema: {
                body: z.object({
                    goalId: z.string(),
                }),
            },
        },

        async request => {
            const { goalId } = request.body

            await createGoalCompletionRequest({
                goalId,
            })
        }
    )
}
