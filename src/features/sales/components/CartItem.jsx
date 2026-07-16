export function CartItem({ item, onIncrease, onDecrease, onRemove }) {
    return (
        <tr>
            <td>{item.name}</td>
            <td>
                <button onClick={() => onDecrease(item.id)}>-</button>
                {item.quantity}
                <button onClick={() => onIncrease(item.id)}>+</button>
            </td>
            <td>${item.price.toFixed(2)}</td>
            <td>${item.subtotal.toFixed(2)}</td>
            <td>
                <button onClick={() => onRemove(item.id)}>x</button>
            </td>
        </tr>
    )
}