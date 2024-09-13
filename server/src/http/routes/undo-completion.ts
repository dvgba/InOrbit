import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { undoGoalCompletion } from '../../functions/undo-goal-completion-request'

export const undoCompletionRoute: FastifyPluginAsyncZod = async (
    app,
    _opts
) => {
    app.delete(
        '/completions/:goalId',
        {
            schema: {
                params: z.object({
                    goalId: z.string(),
                }),
            },
        },
        async request => {
            const { goalId } = request.params

            try {
                await undoGoalCompletion({ goalId })
                return { status: 'Undo successful' }
            } catch (error) {
                if (error instanceof Error) {
                    return { status: 'Error', message: error.message }
                    // biome-ignore lint/style/noUselessElse: <explanation>
                } else {
                    return {
                        status: 'Error',
                        message: 'An unknown error occurred',
                    }
                }
            }
        }
    )
}
