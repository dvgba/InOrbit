import { createId } from '@paralleldrive/cuid2'
import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core'

export const goals = pgTable('goals', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => createId()),
    title: text('title').notNull(),
    desiredWeeklyFrequency: integer('desired_weekly_frequency').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
})

export const goalCompletions = pgTable('goal_completions', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => createId()),
    goalId: text('goal_id').references(() => goals.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
})
