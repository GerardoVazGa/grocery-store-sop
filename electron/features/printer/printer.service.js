import { BrowserWindow } from "electron"
import { generateTicketHTML } from "./templates/ticket.js"
// import ThermalPrinter from "node-thermal-printer"

export function printTicket({ sale, items, storeName, printerName = null }) {
    return new Promise((resolve, reject) => {
        const ticketHTML = generateTicketHTML({ sale, items, storeName })

        // ventana oculta solo para imprimir
        const printWindow = new BrowserWindow({
            show: false,
            webPreferences: { nodeIntegration: false },
        })

        printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(ticketHTML)}`)

        printWindow.webContents.once("did-finish-load", () => {
            printWindow.webContents.print(
                {
                    silent: true,           // sin diálogo de impresión
                    printBackground: true,
                    deviceName: printerName, // null = impresora predeterminada
                },
                (success, errorType) => {
                    printWindow.close()
                    if (success) resolve({ success: true })
                    else reject(new Error(errorType))
                }
            )
        })
    })
}

export function getAvailablePrinters(mainWindow) {
    return mainWindow.webContents.getPrintersAsync()
}

// export function openCashDrawer(printerPort) {
//     const printer = new ThermalPrinter.printer({
//         type: ThermalPrinter.types.EPSON,
//         interface: printerPort, // ej. "//localhost/Epson_TM_T20"
//     })
//     printer.openCashDrawer()
//     return printer.execute()
// }