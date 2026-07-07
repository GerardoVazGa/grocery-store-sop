import { findProductById } from "../products/products.repository.js"
import { decrementProductStock, getAllSales, getSaleById, insertSale, insertSaleItems } from "./sales.repository.js"

export function createSaleService(db, items, paymentMethod = "cash") {
    if(!items || items.length === 0) {
        throw new Error("No se pueden crear ventas sin productos")
    }

    const validPaymentMethods = ["cash", "card", "transfer"]

    if(!validPaymentMethods.includes(paymentMethod)) {
        throw new Error(`Método de pago inválido. Métodos válidos: ${validPaymentMethods.join(", ")}`)
    }

    const runTransaction = db.transaction(() => {
        let total = 0
        const resolvedItems = []

        for(const item of items) {
            if(!item.productId || item.quantity <= 0) {
                throw new Error("Todos los productos deben tener un id y una cantidad mayor a 0")
            }

            const product = findProductById(db, item.productId)

            if(!product) {
                throw new Error(`El producto con id ${item.productId} no existe`)
            }

            if(product.stock < item.quantity) {
                throw new Error(`No hay suficiente stock del producto ${product.name}`)
            }

            if(!Number.isInteger(item.quantity) || item.quantity <= 0) {
                throw new Error("La cantidad debe ser un número entero mayor a 0")
            }

            const subtotal = item.quantity * product.price
            total += subtotal

            resolvedItems.push({
                productId: product.id,
                quantity: item.quantity,
                unitPrice: product.price,
                subtotal
            })
        }

        const saleId = insertSale(db, total, paymentMethod)

        for(const resolvedItem of resolvedItems) {
            insertSaleItems(db, {saleId, ...resolvedItem})
            decrementProductStock(db, resolvedItem.productId, resolvedItem.quantity)
        }

        return getSaleById(db, saleId)
    })

    return runTransaction()
}

export function getAllSalesService(db) {
    return getAllSales(db)
}

export function getSaleByIdService(db, saleId) {
    return getSaleById(db, saleId)
}