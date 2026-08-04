export function PaymentMethod({ value, onChange }) {
    const methods = [
        { id: "cash", label: "Efectivo" },
        { id: "card", label: "Tarjeta" },
        { id: "transfer", label: "Transferencia" },
    ]

    return (
        <div className="flex gap-2">
            {methods.map((method) => (
                <button
                    key={method.id}
                    onClick={() => onChange(method.id)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors border
                        ${value === method.id
                            ? "bg-primary text-sidebar-text border-primary"
                            : "bg-surface text-text border-border hover:bg-primary-bg"
                        }`}
                >
                    {method.label}
                </button>
            ))}
        </div>
    )
}