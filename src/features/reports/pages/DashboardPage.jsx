import { CashCutSummary } from "../../cashCuts/components/CashCutSummary";
import { useCashCutsSummary } from "../../cashCuts/hooks/useCashCutsSummary";
import { useCashCutStore } from "../../cashCuts/store/cashCutStore";
import { DailySummary } from "../components/DailySummary";
import { PeriodSelector } from "../components/PeriodSelector";
import { SalesByCategoryAndBrand } from "../components/SalesByCategoryAndBrand";
import { TopProducts } from "../components/TopProducts";
import { useReportsPeriodStore } from "../store/reportsStore";

export function DashboardPage() {
    const { period } = useReportsPeriodStore()
    const { activeCashCut } = useCashCutStore()
    const { 
        cashCutsSummary, 
        isLoading: isLoadingCashCutsSummary, 
        error: cashCutsSummaryError 
    } = useCashCutsSummary({ cashCutId: activeCashCut?.id })
    
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text">Dashboard</h1>
                    <p className="text-text-muted text-sm mt-1">
                        Resumen de ventas y métricas del negocio
                    </p>
                </div>
                <PeriodSelector />
            </div>
            <div className="grid grid-cols-2 gap-6">
                <DailySummary />
                {period === "day" && (
                    <CashCutSummary 
                        summary={cashCutsSummary} 
                        isLoading={isLoadingCashCutsSummary} 
                        error={cashCutsSummaryError} 
                    />
                )}
            </div>

            <TopProducts />
            <SalesByCategoryAndBrand />
        </div>
    )
}