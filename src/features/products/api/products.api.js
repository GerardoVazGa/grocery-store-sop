export const productsApi = {
    getAll: async () => window.api.products.getAll(),
    findByBarCode: async (barCode) => window.api.products.findByBarCode(barCode),
    findById: async (id) => window.api.products.findById(id),
    create: async (product) => window.api.products.create(product),
    update: async (id, product) => window.api.products.update(id, product),
    delete: async (id) => window.api.products.delete(id),
    search: async (query) => window.api.products.search(query),
}