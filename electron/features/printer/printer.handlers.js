import { ipcMain } from "electron"
import { printTicket, getAvailablePrinters } from "./printer.service.js"

let mainWindowRef = null

export function registerPrinterHandlers(mainWindow) {
    mainWindowRef = mainWindow

    ipcMain.handle("printer:print", (event, data) => {
        return printTicket(data)
    })

    ipcMain.handle("printer:getAvailable", () => {
        return getAvailablePrinters(mainWindowRef)
    })
}