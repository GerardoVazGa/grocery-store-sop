import { ipcMain } from "electron";
import { closeCashCut, getCashCutSummary, getDailySales } from "./cashCuts.repository.js";
import db from "../../db/connection.js";

export function registerCashCutsHandlers() {
    ipcMain.handle("cashCuts:getSummary", () => {
        return getCashCutSummary(db)
    })

    ipcMain.handle("cashCuts:getDailySales", () => {
        return getDailySales(db)
    })

    ipcMain.handle("cashCuts:close", () => {
        return closeCashCut(db)
    })
}