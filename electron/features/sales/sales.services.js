import { getActiveCashCut } from "../cashCuts/cashCuts.repository.js"
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

    const activeCashCut = getActiveCashCut(db)

    if(!activeCashCut) {
        throw new Error("No hay un corte de caja abierto. Por favor, abre un corte de caja antes de crear una venta.")
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

        const saleId = insertSale(db, total, paymentMethod, activeCashCut.id)

        for(const resolvedItem of resolvedItems) {
            insertSaleItems(db, {saleId, ...resolvedItem})
            decrementProductStock(db, resolvedItem.productId, resolvedItem.quantity)
        }

        return saleId
    })

    const saleId = runTransaction()
    return getSaleByIdService(db, saleId)
}

export function getAllSalesService(db) {
    return getAllSales(db)
}

export function getSaleByIdService(db, saleId) {
    const sales = getSaleById(db, saleId)

    if(!sales) {
        throw new Error(`No se encontró la venta con id ${saleId}`)
    }

    const sale = sales.reduce((acc, row) => {
        if(!acc.id) {
            acc.id = row.id
            acc.total = row.total
            acc.paymentMethod = row.paymentMethod
            acc.createdAt = row.createdAt
            acc.items = []
        }

        if(row.productId) {
            acc.items.push({
                productId: row.productId,
                productName: row.productName,
                quantity: row.quantity,
                unitPrice: row.unitPrice,
                subtotal: row.subtotal
            })
        }

        return acc
    }, {})

    return sale
}