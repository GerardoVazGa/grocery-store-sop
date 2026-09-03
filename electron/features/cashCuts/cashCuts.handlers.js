import { ipcMain } from "electron";
import { closeCashCut, getActiveCashCut, getCashCutById, getCashCutSales, getCashCutSummary, openCashCut, reopenCashCut } from "./cashCuts.repository.js";
import db from "../../db/connection.js";

export function registerCashCutsHandlers() {
    ipcMain.handle("cashCuts:getSummary", () => {
        return getCashCutSummary(db)
    })

    ipcMain.handle("cashCuts:getCashCutSales", (event, cashCutId) => {
        return getCashCutSales(db, cashCutId)
    })

    ipcMain.handle("cashCuts:getActive", () => {
        return getActiveCashCut(db)
    })

    ipcMain.handle("cashCuts:open", (event, {openingAmount}) => {
        return openCashCut(db, openingAmount)
    })

    ipcMain.handle("cashCuts:close", (event, cashCutId, countedCash) => {
        return closeCashCut(db, cashCutId, countedCash)
    })

    ipcMain.handle("cashCuts:reopen", (event, cashCutId) => {
        return reopenCashCut(db, cashCutId)
    })

    ipcMain.handle("cashCuts:getById", (event, id) => {
        return getCashCutById(db, id)
    })

}