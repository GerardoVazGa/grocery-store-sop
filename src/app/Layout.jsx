import { NavLink, Outlet } from "react-router-dom";

export function Layout() {
    return (
        <div>
            <nav>
                <NavLink to="/">Dashboard</NavLink>
                <NavLink to="/products">Productos</NavLink>
                <NavLink to="/sales">Ventas</NavLink>
                <NavLink to="/cash-cuts">Corte de caja</NavLink>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    )
}