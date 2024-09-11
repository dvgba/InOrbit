import { Dialog } from './componentes/ui/dialog'
import { CreateGoal } from './componentes/create-goal'
import { EmptyGoals } from './componentes/empty-goals'
import { Summary } from './componentes/summary'

export function App() {
    return (
        <Dialog>
            <EmptyGoals />
            <Summary />
            <CreateGoal />
        </Dialog>
    )
}
