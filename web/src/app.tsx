import { Dialog } from './componentes/ui/dialog'
import { CreateGoal } from './componentes/create-goal'
import { Summary } from './componentes/summary'
import { EmptyGoals } from './componentes/empty-goals'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from './http/get-summary'
import { Loader2 } from 'lucide-react'

export function App() {
    const { data, isLoading } = useQuery({
        queryKey: ['summary'],
        queryFn: getSummary,
        staleTime: 1000 * 60, // 60 seconds
    })

    if (isLoading || !data) {
        return (
            <div className="h-screen flex items-center justify-center">
                <Loader2 className="text-zinc-500 animate-spin size-10" />
            </div>
        )
    }

    return (
        <Dialog>
            {data?.total && data.total > 0 ? <Summary /> : <EmptyGoals />}

            <CreateGoal />
        </Dialog>
    )
}
