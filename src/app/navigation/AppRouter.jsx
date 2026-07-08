import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../Layout";
import { ProductsPage } from "../../features/products/pages/ProductsPage";
import { DashboardPage } from "../../features/reports/pages/DashBoardPage";
import { CashCutsPage } from "../../features/cashCuts/pages/CashCutsPage";

export function AppRouter() {
    return (
        <MemoryRouter initialEntries={["/"]}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="sales" element={<h1>Ventas</h1>} />
                    <Route path="cash-cuts" element={<CashCutsPage />} />
                </Route>
            </Routes>
        </MemoryRouter>
    )
}