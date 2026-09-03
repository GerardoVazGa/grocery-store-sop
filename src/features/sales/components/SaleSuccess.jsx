import { useEffect } from "react"

export function SaleSuccess({ sale, onViewTicket, onNewSale, onPrint, hasPrinter }) {
    // si hay impresora, imprime automáticamente al montar
    useEffect(() => {
        if (hasPrinter) {
            onPrint()
        }
    }, [hasPrinter, onPrint])

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-surface rounded-xl shadow-xl w-full max-w-sm p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">✅</span>
                </div>

                <h2 className="text-xl font-bold text-text mb-1">¡Venta registrada!</h2>
                <p className="text-text-muted text-sm mb-2">Venta #{sale?.id}</p>
                <p className="text-3xl font-bold text-primary mb-6">
                    ${Number(sale?.total).toFixed(2)}
                </p>

                {hasPrinter ? (
                    // con impresora: solo botón de nueva venta
                    <button
                        onClick={onNewSale}
                        className="w-full px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-sidebar-text text-sm font-medium transition-colors"
                    >
                        Nueva venta
                    </button>
                ) : (
                    // sin impresora: ver ticket o nueva venta
                    <div className="flex gap-3">
                        <button
                            onClick={onNewSale}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-border text-text-muted hover:bg-primary-bg text-sm font-medium transition-colors"
                        >
                            Nueva venta
                        </button>
                        <button
                            onClick={onViewTicket}
                            className="flex-1 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-sidebar-text text-sm font-medium transition-colors"
                        >
                            🧾 Ver ticket
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}