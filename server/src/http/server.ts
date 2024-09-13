import fastify from 'fastify'
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import z from 'zod'
import { createGoalRoute } from './routes/create-goal'
import { createCompletionRoute } from './routes/create-completion'
import { getPendingGoalsRoute } from './routes/get-pending-goals'
import { getWeekSummaryRoute } from './routes/get-week-summary'
import fastifyCors from '@fastify/cors'
import { deleteGoalRoute } from './routes/delete-goal-route'
import { undoCompletionRoute } from './routes/undo-completion'

const app = fastify().withTypeProvider<ZodTypeProvider>()

// CORS Register (Cross-Origin Resource Sharing)
app.register(fastifyCors, {
    origin: '*',
})

// Validations
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// Routes
app.register(createGoalRoute)
app.register(createCompletionRoute)
app.register(getPendingGoalsRoute)
app.register(getWeekSummaryRoute)
app.register(deleteGoalRoute)
app.register(undoCompletionRoute)

// Application
app.listen({
    port: 3333,
}).then(() => {
    console.log('HTTP server running!')
})
function createGoalCompletion(arg0: { goalId: string }) {
    throw new Error('Function not implemented.')
}
