// functions/undo-goal-completion.ts
import { eq, gte, lte, and, desc } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions } from '../db/schema'
import dayjs from 'dayjs'

interface UndoGoalCompletionRequest {
    goalId: string
}

export async function undoGoalCompletion({
    goalId,
}: UndoGoalCompletionRequest) {
    const firstDayOfWeek = dayjs().startOf('week').toDate()
    const lastDayOfWeek = dayjs().endOf('week').toDate()

    const recentCompletion = await db
        .select()
        .from(goalCompletions)
        .where(
            and(
                eq(goalCompletions.goalId, goalId),
                gte(goalCompletions.createdAt, firstDayOfWeek),
                lte(goalCompletions.createdAt, lastDayOfWeek)
            )
        )
        .orderBy(desc(goalCompletions.createdAt))
        .limit(1)

    if (recentCompletion.length === 0) {
        throw new Error('No completion found to undo!')
    }

    const { id } = recentCompletion[0]

    await db.delete(goalCompletions).where(eq(goalCompletions.id, id))

    return { status: 'Undo successful' }
}
