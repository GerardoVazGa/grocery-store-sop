export function CartItem({ item, onIncrease, onDecrease, onRemove }) {
    return (
        <div className="flex items-center gap-3 bg-primary-bg rounded-lg p-3">
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text truncate">{item.name}</p>
                <p className="text-xs text-text-muted">${item.price.toFixed(2)} / unidad</p>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onDecrease(item.id)}
                    className="w-7 h-7 rounded-full bg-surface border border-border text-text font-bold hover:bg-primary-bg transition-colors"
                >
                    -
                </button>
                <span className="w-6 text-center text-sm font-semibold text-text">
                    {item.quantity}
                </span>
                <button
                    onClick={() => onIncrease(item.id)}
                    className="w-7 h-7 rounded-full bg-surface border border-border text-text font-bold hover:bg-primary-bg transition-colors"
                >
                    +
                </button>
            </div>
            <div className="text-right">
                <p className="text-sm font-semibold text-text">${item.subtotal.toFixed(2)}</p>
                <button
                    onClick={() => onRemove(item.id)}
                    className="text-xs text-danger hover:underline"
                >
                    Quitar
                </button>
            </div>
        </div>
    )
}