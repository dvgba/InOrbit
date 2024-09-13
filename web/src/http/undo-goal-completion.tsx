export async function undoGoalCompletion(goalId: string) {
    try {
        const response = await fetch(
            `http://localhost:3333/completions/${goalId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

        if (!response.ok) {
            throw new Error('Failed to undo goal completion')
        }
    } catch (error) {
        console.error('Failed to undo goal completion:', error)
    }
}
