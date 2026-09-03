import { useState } from "react";
import { CashCutSummary } from "../components/CashCutSummary";
import { CloseCashCutButton } from "../components/CloseCashCutButton";
import { DailySalesList } from "../components/DailySalesList";
import { useCashCutsSummary } from "../hooks/useCashCutsSummary";
import { useDailySales } from "../hooks/useDailySales";
import { useCashCutStore } from "../store/cashCutStore";
import { CloseCashCutModal } from "../components/CloseCashCutModal";

export function CashCutsPage() {
    const { 
        activeCashCut,
        closeCashCut, 
        isClosing, 
        isReopening,
        error, 
        isClosed, 
        reset 
    } = useCashCutStore()
    const { cashCutsSummary, isLoading: isLoadingCashCutsSummary, error: cashCutsSummaryError } = useCashCutsSummary({ cashCutId: activeCashCut?.id })
    const { dailySales, isLoading: salesLoading } = useDailySales({ cashCutId: activeCashCut?.id })
    const [showModal, setShowModal] = useState(false)

    const isLoading = isLoadingCashCutsSummary || salesLoading

    const handlerCloseCashCut = async ({countedCash}) => {
        await closeCashCut(countedCash)
        setShowModal(false)
    }

    if (isLoading) return (
        <div className="p-6 space-y-4">
            <div className="bg-surface rounded-xl animate-pulse h-48" />
            <div className="bg-surface rounded-xl animate-pulse h-64" />
        </div>
    )

    if (isClosed) return (
        <div className="p-6 flex items-center justify-center h-full">
            <div className="bg-surface rounded-xl p-12 text-center shadow-sm max-w-sm w-full">
                <p className="text-5xl mb-4">✅</p>
                <h2 className="text-xl font-bold text-text mb-2">Corte cerrado</h2>
                <p className="text-text-muted text-sm mb-6">
                    El corte del día se registró correctamente.
                </p>
                
                <button
                    onClick={reset}
                    disabled={isReopening}
                    className="text-sm text-text-muted hover:text-danger underline transition-colors mt-4 block mx-auto disabled:opacity-50"
                >
                    {isReopening ? "Reabriendo..." : "¿Fue un error? Reabrir corte"}
                </button>
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
                <CloseCashCutButton onClose={() => setShowModal(true)} isLoading={isClosing} error={error} />
            </div>

            <CashCutSummary summary={cashCutsSummary} isLoading={isLoadingCashCutsSummary} error={cashCutsSummaryError} />
            <DailySalesList sales={dailySales} />

            {
                showModal && (
                    <CloseCashCutModal 
                        summary={cashCutsSummary} 
                        onConfirm={handlerCloseCashCut} 
                        onCancel={() => setShowModal(false)} 
                        isClosing={isClosing} 
                    />
                )
            }
        </div>
    )
}