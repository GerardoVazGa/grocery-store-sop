const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("api", {
    products: {
        getAll: () => ipcRenderer.invoke("products:getAll"),
        findByBarCode: (barCode) => ipcRenderer.invoke("products:findByBarCode", barCode),
        findById: (id) => ipcRenderer.invoke("products:findById", id),
        create: (product) => ipcRenderer.invoke("products:create", product),
        update: (id, product) => ipcRenderer.invoke("products:update", id, product)
    }
})