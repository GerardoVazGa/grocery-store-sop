import { ipcMain } from "electron";
import { getCashCutSummary } from "./cashCuts.repository.js";
import db from "../../db/connection.js";

export function registerCashCutsHandlers() {
    ipcMain.handle("cashCuts:getSummary", () => {
        return getCashCutSummary(db)
    })
}