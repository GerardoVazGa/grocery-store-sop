import { DailySummary } from "../components/DailySummary";
import { SalesByCategoryAndBrand } from "../components/SalesByCategoryAndBrand";
import { TopProducts } from "../components/TopProducts";

export function DashboardPage() {
    return (
        <div>
            <h1>Dashboard</h1>
            <DailySummary />
            <TopProducts />
            <SalesByCategoryAndBrand />
        </div>
    )
}