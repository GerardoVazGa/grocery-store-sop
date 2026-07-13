const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("api", {
    products: {
        getAll: () => ipcRenderer.invoke("products:getAll"),
        findByBarCode: (barCode) => ipcRenderer.invoke("products:findByBarCode", barCode),
        findById: (id) => ipcRenderer.invoke("products:findById", id),
        create: (product) => ipcRenderer.invoke("products:create", product),
        update: (id, product) => ipcRenderer.invoke("products:update", id, product),
        search: (query) => ipcRenderer.invoke("products:search", query)
    },
    categories: {
        getAll: () => ipcRenderer.invoke("categories:getAll")
    },
    brands: {
        getAll: () => ipcRenderer.invoke("brands:getAll"),
        getByCategory: (categoryId) => ipcRenderer.invoke("brands:getByCategory", categoryId)
    },
    sales: {
        create: (saleData) => ipcRenderer.invoke("sales:create", saleData),
        getAll: () => ipcRenderer.invoke("sales:getAll"),
        getById: (saleId) => ipcRenderer.invoke("sales:getById", saleId),
    },
    cashCuts: {
        getSummary: () => ipcRenderer.invoke("cashCuts:getSummary")
    },
    reports: {
        getDailySummary: () => ipcRenderer.invoke("reports:getDailySummary"),
        getTopProductsByCategory: () => ipcRenderer.invoke("reports:getTopProductsByCategory"),
        getSalesByCategory: () => ipcRenderer.invoke("reports:getSalesByCategory"),
        getSalesByCategoryAndBrand: () => ipcRenderer.invoke("reports:getSalesByCategoryAndBrand")
    }
})