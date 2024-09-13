// componentes/undo-button.tsx
import { undoGoalCompletion } from '../http/undo-goal-completion'

interface UndoButtonProps {
    goalId: string
    onUndoSuccess?: () => void
}

export function UndoButton({ goalId, onUndoSuccess }: UndoButtonProps) {
    const handleUndo = async () => {
        try {
            await undoGoalCompletion(goalId)
            // Chama a função de callback se fornecida
            if (onUndoSuccess) onUndoSuccess()
        } catch (error) {
            console.error('Error undoing goal completion:', error)
        }
    }

    return (
        // biome-ignore lint/a11y/useButtonType: <explanation>
        <button
            className="text-zinc-400 underline hover:no-underline"
            onClick={handleUndo}
        >
            Desfazer
        </button>
    )
}
