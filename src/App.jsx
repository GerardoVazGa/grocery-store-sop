import { useEffect } from 'react'
import './App.css'
import { AppRouter } from './app/navigation/AppRouter.jsx'
import { useCashCutStore } from './features/cashCuts/store/cashCutStore.js'
import { OpenCashCutForm } from './features/cashCuts/components/OpenCashCutForm.jsx'

function App() {
    const { activeCashCut: activeCut, isClosed, isLoading, checkActiveCashCut } = useCashCutStore()

    useEffect(() => {
        checkActiveCashCut()
    }, [])

    if (isLoading) return (
        <div className="min-h-screen bg-primary-bg flex items-center justify-center">
            <p className="text-text-muted">Cargando...</p>
        </div>
    )

    if (isClosed) return <AppRouter />

    if (!activeCut) return <OpenCashCutForm />

    return <AppRouter />
}

export default App
