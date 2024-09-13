// functions/delete-goal.ts
import { sql } from 'drizzle-orm'
import { db } from '../db'
import { goals } from '../db/schema'

interface DeleteGoalRequest {
    goalId: string
}

export async function deleteGoal({ goalId }: DeleteGoalRequest) {
    const result = await db.execute(sql`
        DELETE FROM goals
        WHERE id = ${goalId}
        RETURNING *
    `)

    return result
}
