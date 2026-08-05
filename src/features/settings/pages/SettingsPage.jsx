import { NavLink, Outlet } from "react-router-dom"

const settingsLinks = [
    { to: "/settings/categories", label: "Categorías", icon: "🏷️", description: "Gestiona las categorías de productos" },
    { to: "/settings/brands", label: "Marcas", icon: "⭐", description: "Gestiona las marcas por categoría" },
]

export function SettingsPage() {
    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-text">Configuración</h1>
                <p className="text-text-muted text-sm mt-1">Gestiona el catálogo de tu tienda</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {settingsLinks.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            `bg-surface rounded-xl p-5 shadow-sm border transition-all hover:shadow-md ${
                                isActive ? "border-primary" : "border-border"
                            }`
                        }
                    >
                        <p className="text-2xl mb-2">{link.icon}</p>
                        <p className="font-semibold text-text">{link.label}</p>
                        <p className="text-xs text-text-muted mt-1">{link.description}</p>
                    </NavLink>
                ))}
            </div>

            <Outlet />
        </div>
    )
}