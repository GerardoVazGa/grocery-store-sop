export const categoriesApi = {
    getAll: async () => window.api.categories.getAll(),
    findById: async (id) => window.api.categories.findById(id),
    create: async (data) => window.api.categories.create(data),
    update: async (id, data) => window.api.categories.update(id, data),
}