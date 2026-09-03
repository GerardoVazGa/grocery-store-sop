import { NavLink, Outlet } from "react-router-dom";
import { useCashCutStore } from "../features/cashCuts/store/cashCutStore";
import { useEffect, useState } from "react";

export function Layout() {
    const { isClosed } = useCashCutStore()
    const [version, setVersion] = useState("")

    useEffect(() => {
        window.api.version().then(setVersion)
    }, [])

    return (
        <div className = "flex h-screen bg-primary-bg overflow-hidden">
            <aside className="w-56 bg-primary flex flex-col flex-shrink-0">
                <div className="min-w-0 px-6 py-5 border-b border-primary-light">
                    <h1 className="text-sidebar-text font-bold break-words text-lg leading-tight">
                        Abarrotes POS
                    </h1>
                    <p className="text-sidebar-text opacity-60 text-xs mt-0.5">
                        Sistema de Ventas
                    </p>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1">
                    {NAV_ITEMS.map((item) => {
                        const isDisabled = item.to === "/sales" && isClosed

                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                                    ${isDisabled ? "opacity-40 pointer-events-none" : ""}
                                    ${isActive
                                        ? "bg-primary-light text-sidebar-text"
                                        : "text-sidebar-text opacity-70 hover:opacity-100 hover:bg-primary-light"
                                    }`
                                }
                            >
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                                {isDisabled && (
                                    <span className="ml-auto text-xs opacity-60">Cerrado</span>
                                )}
                            </NavLink>
                        )
                    })}
                </nav>

                <footer className="px-6 py-4 border-t border-primary-light">
                    <p className="text-sidebar-text opacity-40 text-xs">
                        v{version}
                    </p>
                </footer>
            </aside>

            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    )
}

const NAV_ITEMS = [
    { to: "/", label: "Dashboard", icon: "📊", end: true },
    { to: "/sales", label: "Ventas", icon: "🛒" },
    { to: "/products", label: "Productos", icon: "📦" },
    { to: "/cash-cuts", label: "Corte de caja", icon: "💰" },
    { to: "/settings", label: "Configuración", icon: "⚙️" },
]