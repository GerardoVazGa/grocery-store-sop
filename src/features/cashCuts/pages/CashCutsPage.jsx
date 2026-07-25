import { CashCutSummary } from "../components/CashCutSummary";
import { CloseCashCutButton } from "../components/CloseCashCutButton";
import { DailySalesList } from "../components/DailySalesList";
import { useCashCutsSummary } from "../hooks/useCashCutsSummary";
import { useDailySales } from "../hooks/useDailySales";
import { useCashCutStore } from "../store/cashCutStore";

export function CashCutsPage() {
    const { cashCutsSummary, isLoading: isLoadingCashCutsSummary } = useCashCutsSummary()
    const { dailySales, isLoading: salesLoading } = useDailySales()
    const { closeCashCut, isClosing, error, isClosed } = useCashCutStore()

    const isLoading = isLoadingCashCutsSummary || salesLoading

    if (isLoading) return <p>Cargando Corte de caja...</p>

    if (isClosed) {
        return (
            <div>
                <h1>Corte de caja</h1>
                <p>✅ El corte del día se cerró correctamente.</p>
            </div>
        )
    }


    return (
        <div>
            <h1>Corte de caja</h1>
            <CashCutSummary cashCutsSummary={cashCutsSummary} />
            <hr />
            <DailySalesList sales={dailySales} />
            <hr />
            <CloseCashCutButton
                onClose={closeCashCut}
                isLoading={isClosing}
                error={error}
            />
        </div>
    )
}