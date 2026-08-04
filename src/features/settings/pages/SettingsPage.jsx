import { NavLink, Outlet } from "react-router-dom"

export function SettingsPage() {
    return (
        <div>
            <h1>Configuración</h1>
            <nav>
                <NavLink to="/settings/categories">Categorías</NavLink>
                <NavLink to="/settings/brands">Marcas</NavLink>
            </nav>
            <hr />
            <Outlet />
        </div>
    )
}