export const salesApi = {
    getAllSales: async () => window.api.sales.getAll(),
    getSaleById: async (saleId) => window.api.sales.getById(saleId),
    createSale: async (saleData) => window.api.sales.create(saleData),

}