import { CashCutSummary } from "../components/CashCutSummary";
import { CloseCashCutButton } from "../components/CloseCashCutButton";
import { DailySalesList } from "../components/DailySalesList";
import { useCashCutsSummary } from "../hooks/useCashCutsSummary";
import { useDailySales } from "../hooks/useDailySales";
import { useCashCutStore } from "../store/cashCutStore";

export function CashCutsPage() {
    const { cashCutsSummary, isLoading: isLoadingCashCutsSummary, error: cashCutsSummaryError } = useCashCutsSummary()
    const { dailySales, isLoading: salesLoading } = useDailySales()
    const { closeCashCut, isClosing, error, isClosed } = useCashCutStore()

    const isLoading = isLoadingCashCutsSummary || salesLoading

    if (isLoading) return (
        <div className="p-6 space-y-4">
            <div className="bg-surface rounded-xl animate-pulse h-48" />
            <div className="bg-surface rounded-xl animate-pulse h-64" />
        </div>
    )

    if (isClosed) return (
        <div className="p-6 flex items-center justify-center h-full">
            <div className="bg-surface rounded-xl p-12 text-center shadow-sm max-w-sm">
                <p className="text-5xl mb-4">✅</p>
                <h2 className="text-xl font-bold text-text mb-2">Corte cerrado</h2>
                <p className="text-text-muted text-sm">El corte del día se registró correctamente.</p>
            </div>
        </div>
    )

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text">Corte de caja</h1>
                    <p className="text-text-muted text-sm mt-1">Resumen y cierre del día</p>
                </div>
                <CloseCashCutButton onClick={closeCashCut} isLoading={isClosing} error={error} />
            </div>

            <CashCutSummary summary={cashCutsSummary} isLoading={isLoadingCashCutsSummary} error={cashCutsSummaryError} />
            <DailySalesList sales={dailySales} />
        </div>
    )
}