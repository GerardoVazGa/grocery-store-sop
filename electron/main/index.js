import { app, BrowserWindow } from "electron"
import { paths } from "../configs/paths.js"
import { DEV_SERVER_URL } from "../configs/env.js"
import '../db/connection.js'
import { registerProductsHandlers } from "../features/products/products.handlers.js"
import { registerBrandsHandlers } from "../features/brands/brands.handlers.js"
import { registerCategoriesHandlers } from "../features/categories/categories.handlers.js"

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: paths.preload,
            contextIsolation: true,
            nodeIntegration: false
        },
    })

    const isDev = !app.isPackaged

    if (isDev) {
        mainWindow.loadURL(DEV_SERVER_URL)
        mainWindow.webContents.openDevTools()
    } else {
        mainWindow.loadFile(paths.distIndex)
    }
}

app.whenReady().then(() => {
    registerProductsHandlers()
    registerCategoriesHandlers()
    registerBrandsHandlers()
    createWindow()
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})