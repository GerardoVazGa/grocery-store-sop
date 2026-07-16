import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../Layout";
import { ProductsPage } from "../../features/products/pages/ProductsPage";
import { DashboardPage } from "../../features/reports/pages/DashBoardPage";
import { CashCutsPage } from "../../features/cashCuts/pages/CashCutsPage";
import { SalesPage } from "../../features/sales/pages/salesPage";

export function AppRouter() {
    return (
        <MemoryRouter initialEntries={["/"]}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="sales" element={<SalesPage />} />
                    <Route path="cash-cuts" element={<CashCutsPage />} />
                </Route>
            </Routes>
        </MemoryRouter>
    )
}