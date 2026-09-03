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
        getSummary: (cashCutId) => ipcRenderer.invoke("cashCuts:getSummary", cashCutId),
        getCashCutSales: (cashCutId) => ipcRenderer.invoke("cashCuts:getCashCutSales", cashCutId),
        getActive: () => ipcRenderer.invoke("cashCuts:getActive"),
        open: (openingAmount) => ipcRenderer.invoke("cashCuts:open", openingAmount),
        reopen: (cashCutId) => ipcRenderer.invoke("cashCuts:reopen", cashCutId),
        getById: (id) => ipcRenderer.invoke("cashCuts:getById", id),
        close: (cashCutId, countedCash) => ipcRenderer.invoke("cashCuts:close", cashCutId, countedCash)
    },
    reports: {
        getDailySummary: (period) => ipcRenderer.invoke("reports:getDailySummary", period),
        getTopProductsByCategory: (period) => ipcRenderer.invoke("reports:getTopProductsByCategory", period),
        getSalesByCategory: (period) => ipcRenderer.invoke("reports:getSalesByCategory", period),
        getSalesByCategoryAndBrand: (period) => ipcRenderer.invoke("reports:getSalesByCategoryAndBrand", period),
        getDailySales: (period) => ipcRenderer.invoke("reports:getDailySales", period)
    },
    printer: {
        print: (data) => ipcRenderer.invoke("printer:print", data),
        getAvailable: () => ipcRenderer.invoke("printer:getAvailable")
    }
})