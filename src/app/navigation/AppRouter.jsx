import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../Layout";
import { ProductsPage } from "../../features/products/pages/ProductsPage";
import { DashboardPage } from "../../features/reports/pages/DashBoardPage";
import { CashCutsPage } from "../../features/cashCuts/pages/CashCutsPage";
import { SalesPage } from "../../features/sales/pages/salesPage";
import { SettingsPage } from "../../features/settings/pages/SettingsPage";
import { CategoriesPage } from "../../features/categories/pages/CategoriesPage";
import { BrandsPage } from "../../features/brands/pages/BrandsPage";

export function AppRouter() {
    return (
        <MemoryRouter initialEntries={["/"]}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="sales" element={<SalesPage />} />
                    <Route path="cash-cuts" element={<CashCutsPage />} />
                    <Route path="settings" element={<SettingsPage />} >
                        <Route path="categories" element={<CategoriesPage />} />
                        <Route path="brands" element={<BrandsPage />} />
                    </Route>
                </Route>
            </Routes>
        </MemoryRouter>
    )
}