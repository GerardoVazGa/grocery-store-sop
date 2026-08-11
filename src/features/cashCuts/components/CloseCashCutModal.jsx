export function CloseCashCutModal({ summary, onConfirm, onCancel, isClosing }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-surface rounded-xl shadow-xl w-full max-w-md p-6">
                <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl">⚠️</span>
                    <div>
                        <h2 className="text-base font-semibold text-text">Cerrar corte del día</h2>
                        <p className="text-sm text-text-muted mt-0.5">
                            Esta acción registrará el cierre de caja
                        </p>
                    </div>
                </div>

                <div className="bg-primary-bg rounded-xl p-4 space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-text-muted">Total de ventas</span>
                        <span className="text-sm font-semibold text-text">
                            {summary?.totalSales ?? 0} transacciones
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-text-muted">Efectivo en caja</span>
                        <span className="text-sm font-semibold text-text">
                            ${Number(summary?.totalCash ?? 0).toLocaleString("es-MX", { minimumFractionDigits: 2 })}
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

                <p className="text-sm text-text-muted mb-6">
                    ¿Confirmas que los totales son correctos y deseas cerrar el corte?
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        disabled={isClosing}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-border text-text-muted hover:bg-primary-bg text-sm font-medium transition-colors disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isClosing}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-danger hover:bg-danger/80 text-white text-sm font-medium transition-colors disabled:opacity-50"
                    >
                        {isClosing ? "Cerrando..." : "✓ Confirmar cierre"}
                    </button>
                </div>
            </div>
        </div>
    )
}