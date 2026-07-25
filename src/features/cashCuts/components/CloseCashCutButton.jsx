export function CloseCashCutButton({ onClose, isLoading, error }) {
    return (
        <section>
            <h2>Cerrar corte</h2>
            {error && <p>{error}</p>}
            <button onClick={onClose} disabled={isLoading}>
                {isLoading ? "Cerrando corte..." : "Cerrar corte del día"}
            </button>
        </section>
    )
}