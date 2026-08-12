const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("api", {
    products: {
        getAll: () => ipcRenderer.invoke("products:getAll"),
        findByBarCode: (barCode) => ipcRenderer.invoke("products:findByBarCode", barCode),
        findById: (id) => ipcRenderer.invoke("products:findById", id),
        create: (product) => ipcRenderer.invoke("products:create", product),
        update: (id, product) => ipcRenderer.invoke("products:update", id, product),
        delete: (id) => ipcRenderer.invoke("products:delete", id),
        search: (query) => ipcRenderer.invoke("products:search", query)
    },
    categories: {
        getAll: () => ipcRenderer.invoke("categories:getAll"),
        findById: (id) => ipcRenderer.invoke("categories:findById", id),
        findByName: (name) => ipcRenderer.invoke("categories:findByName", name),
        update: (id, data) => ipcRenderer.invoke("categories:update", id, data),
        create: (data) => ipcRenderer.invoke("categories:create", data)
    },
    brands: {
        getAll: () => ipcRenderer.invoke("brands:getAll"),
        getByCategory: (categoryId) => ipcRenderer.invoke("brands:getByCategory", categoryId),
        findById: (id) => ipcRenderer.invoke("brands:findById", id),
        findWithCategoryId: (name, categoryId) => ipcRenderer.invoke("brands:findWithCategoryId", name, categoryId),
        create: (data) => ipcRenderer.invoke("brands:create", data),
        update: (id, data) => ipcRenderer.invoke("brands:update", id, data)
    },
    sales: {
        create: (saleData) => ipcRenderer.invoke("sales:create", saleData),
        getAll: () => ipcRenderer.invoke("sales:getAll"),
        getById: (saleId) => ipcRenderer.invoke("sales:getById", saleId),
    },
    cashCuts: {
        getSummary: () => ipcRenderer.invoke("cashCuts:getSummary"),
        getDailySales: () => ipcRenderer.invoke("cashCuts:getDailySales"),
        close: () => ipcRenderer.invoke("cashCuts:close")
    },
    reports: {
        getDailySummary: () => ipcRenderer.invoke("reports:getDailySummary"),
        getTopProductsByCategory: () => ipcRenderer.invoke("reports:getTopProductsByCategory"),
        getSalesByCategory: () => ipcRenderer.invoke("reports:getSalesByCategory"),
        getSalesByCategoryAndBrand: () => ipcRenderer.invoke("reports:getSalesByCategoryAndBrand")
    },
    printer: {
        print: (data) => ipcRenderer.invoke("printer:print", data),
        getAvailable: () => ipcRenderer.invoke("printer:getAvailable")
    }
})