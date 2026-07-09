export const reportsApi = {
    getDailySummary: async() => window.api.reports.getDailySummary(),
    getTopProductsByCategory: async() => window.api.reports.getTopProductsByCategory(),
    getSalesByCategory: async() => window.api.reports.getSalesByCategory(),
    getSalesByCategoryAndBrand: async() => window.api.reports.getSalesByCategoryAndBrand()
}