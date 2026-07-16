export function PaymentMethod({ value, onChange }) {
    return (
        <div>
            <button
                onClick={() => onChange("cash")}
                disabled={value === "cash"}
            >
                Efectivo
            </button>
            <button
                onClick={() => onChange("card")}
                disabled={value === "card"}
            >
                Tarjeta
            </button>
        </div>
    )
}