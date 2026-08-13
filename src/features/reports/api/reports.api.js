export const reportsApi = {
    getDailySummary: async(period) => window.api.reports.getDailySummary(period),
    getTopProductsByCategory: async(period) => window.api.reports.getTopProductsByCategory(period),
    getSalesByCategory: async(period) => window.api.reports.getSalesByCategory(period),
    getSalesByCategoryAndBrand: async(period) => window.api.reports.getSalesByCategoryAndBrand(period)
}