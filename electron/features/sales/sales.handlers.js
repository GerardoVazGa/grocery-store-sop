import { ipcMain } from "electron";
import db from '../../db/connection.js'
import { createSaleService, getAllSalesService, getSaleByIdService } from "./sales.services.js";

export function registerSalesHandlers() {
    ipcMain.handle("sales:create", (event, payload) => {
        const { items, paymentMethod } = payload

        return createSaleService(db, items, paymentMethod)
    })

    ipcMain.handle("sales:getAll", () => {
        return getAllSalesService(db)
    })

    ipcMain.handle("sales:getById", (event, saleId) => {
        return getSaleByIdService(db, saleId)
    })
}