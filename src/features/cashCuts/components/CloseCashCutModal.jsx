import { useState } from "react"

export function CloseCashCutModal({ summary, onConfirm, onCancel, isClosing }) {
    const [countedCash, setCountedCash] = useState("")

    const expectedCash = Number(summary?.totalCash ?? 0)
    const counted = Number(countedCash) || 0
    const difference = counted - expectedCash

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-surface rounded-xl shadow-xl w-full max-w-md p-6">
                <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl">⚠️</span>
                    <div>
                        <h2 className="text-base font-semibold text-text">Cerrar corte del día</h2>
                        <p className="text-sm text-text-muted mt-0.5">
                            Verifica los totales antes de cerrar
                        </p>
                    </div>
                </div>

                <div className="bg-primary-bg rounded-xl p-4 space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-text-muted">Total de ventas</span>
                        <span className="text-sm font-semibold text-text">
                            {summary?.totalSales ?? 0} transacciones
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-text-muted">Efectivo esperado</span>
                        <span className="text-sm font-semibold text-text">
                            ${expectedCash.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-text-muted">Tarjeta</span>
                        <span className="text-sm font-semibold text-text">
                            ${Number(summary?.totalCard ?? 0).toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                    {summary?.totalTransfer > 0 && (
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-text-muted">Transferencia</span>
                            <span className="text-sm font-semibold text-text">
                                ${Number(summary?.totalTransfer ?? 0).toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                    )}
                    <div className="flex justify-between items-center border-t border-border pt-3">
                        <span className="text-sm font-semibold text-text">Total del día</span>
                        <span className="text-lg font-bold text-primary">
                            ${Number(summary?.totalAmount ?? 0).toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-xs font-medium text-text-muted mb-1">
                        Efectivo contado en caja
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">$</span>
                        <input
                            type="number"
                            step="0.01"
                            value={countedCash}
                            onChange={(e) => setCountedCash(e.target.value)}
                            placeholder="0.00"
                            className="w-full pl-7 pr-4 py-2.5 rounded-xl border border-border bg-primary-bg text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                            autoFocus
                        />
                    </div>
                    {countedCash && (
                        <div className={`flex justify-between items-center mt-2 px-3 py-2 rounded-lg text-sm ${
                            difference === 0
                                ? "bg-green-50 text-green-700"
                                : difference > 0
                                ? "bg-blue-50 text-blue-700"
                                : "bg-red-50 text-red-700"
                        }`}>
                            <span>Diferencia:</span>
                            <span className="font-semibold">
                                {difference > 0 ? "+" : ""}
                                ${difference.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                                {difference === 0 ? " ✓" : difference > 0 ? " (sobrante)" : " (faltante)"}
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        disabled={isClosing}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-border text-text-muted hover:bg-primary-bg text-sm font-medium transition-colors disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => onConfirm({ countedCash: counted })}
                        disabled={isClosing || !countedCash}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-danger hover:bg-danger/80 text-white text-sm font-medium transition-colors disabled:opacity-50"
                    >
                        {isClosing ? "Cerrando..." : "✓ Confirmar cierre"}
                    </button>
                </div>
            </div>
        </div>
    )
}