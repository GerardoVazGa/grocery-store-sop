export const brandsApi = {
    getAll: async () => window.api.brands.getAll(),
    getByCategory: async (categoryId) => window.api.brands.getByCategory(categoryId),
}