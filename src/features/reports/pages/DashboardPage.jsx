import { CashCutSummary } from "../../cashCuts/components/CashCutSummary";
import { useCashCutsSummary } from "../../cashCuts/hooks/useCashCutsSummary";
import { DailySummary } from "../components/DailySummary";
import { SalesByCategoryAndBrand } from "../components/SalesByCategoryAndBrand";
import { TopProducts } from "../components/TopProducts";

export function DashboardPage() {
    const { 
        cashCutsSummary, 
        isLoading: isLoadingCashCutsSummary, 
        error: cashCutsSummaryError 
    } = useCashCutsSummary()
    
    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-text">Dashboard</h1>
                <p className="text-text-muted text-sm mt-1">Resumen del día</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <DailySummary />
                <CashCutSummary 
                    summary={cashCutsSummary} 
                    isLoading={isLoadingCashCutsSummary} 
                    error={cashCutsSummaryError} 
                />
            </div>

            <TopProducts />
            <SalesByCategoryAndBrand />
        </div>
    )
}