export const brandsApi = {
    getAll: async () => window.api.brands.getAll(),
    getByCategory: async (categoryId) => window.api.brands.getByCategory(categoryId),
    findById: async (id) => window.api.brands.findById(id),
    findWithCategoryId: async (name, categoryId) => window.api.brands.findWithCategoryId(name, categoryId),
    create: async (data) => window.api.brands.create(data),
    update: async (id, data) => window.api.brands.update(id, data),
}