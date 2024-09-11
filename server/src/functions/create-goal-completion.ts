import { count, and, eq, sql } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import { gte } from 'drizzle-orm'
import { lte } from 'drizzle-orm'
import dayjs from 'dayjs'

interface CreateGoalCompletionRequest {
    goalId: string
}

export async function createGoalCompletionRequest({
    goalId,
}: CreateGoalCompletionRequest) {
    const firstDayOfWeek = dayjs().startOf('week').toDate()
    const lastDayOfWeek = dayjs().endOf('week').toDate()

    // Cria uma CTE (Common Table Expression) para contar as conclusões de metas
    const goalCompletionCounts = db.$with('goal_completion_counts').as(
        db
            .select({
                goalId: goalCompletions.goalId,
                completionCount: count(goalCompletions.id).as(
                    'completionCount'
                ),
            })
            .from(goalCompletions)
            .where(
                and(
                    gte(goalCompletions.createdAt, firstDayOfWeek),
                    lte(goalCompletions.createdAt, lastDayOfWeek),
                    eq(goalCompletions.id, goalId)
                )
            )
            .groupBy(goalCompletions.goalId)
    )
    // Consulta os dados das metas e a contagem de conclusões
    const result = await db
        .with(goalCompletionCounts)
        .select({
            id: goals.id,
            title: goals.title,
            desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
            completionCount:
                sql`COALESCE(${goalCompletionCounts.completionCount}, 0)`.mapWith(
                    Number
                ),
        })
        .from(goals)
        .leftJoin(
            goalCompletionCounts,
            eq(goalCompletionCounts.goalId, goals.id)
        )
        .where(eq(goals.id, goalId))
        .limit(1)

    const { completionCount, desiredWeeklyFrequency } = result[0]

    if (completionCount >= desiredWeeklyFrequency) {
        throw new Error('Goal already completed this week!')
    }

    const insertResult = await db
        .insert(goalCompletions)
        .values({ goalId })
        .returning()
    const goalCompletion = insertResult[0]

    return {
        goalCompletion,
    }
}
