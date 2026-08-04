export function CloseCashCutButton({ onClose, isLoading, error }) {
    return (
        <div className="flex flex-col items-end gap-1">
            {error && <p className="text-danger text-sm">{error}</p>}
            <button
                onClick={onClose}
                disabled={isLoading}
                className="bg-danger hover:bg-danger/80 text-white font-medium px-5 py-2 rounded-xl transition-colors disabled:opacity-50"
            >
                {isLoading ? "Cerrando..." : "Cerrar corte del día"}
            </button>
        </div>
    )
}