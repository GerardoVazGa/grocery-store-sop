import { NavLink, Outlet } from "react-router-dom";
import { useCashCutStore } from "../features/cashCuts/store/cashCutStore";

export function Layout() {
    const { isClosed } = useCashCutStore()
    return (
        <div>
            <nav>
                <NavLink to="/">Dashboard</NavLink>
                <NavLink to="/products">Productos</NavLink>
                <NavLink to="/sales" style={{ pointerEvents: isClosed ? "none" : "auto", opacity: isClosed ? 0.5 : 1 }}>
                    Ventas {isClosed && "(Corte cerrado)"}
                </NavLink>
                <NavLink to="/cash-cuts">Corte de caja</NavLink>
                {isClosed && <span>✅ Corte cerrado</span>}
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    )
}