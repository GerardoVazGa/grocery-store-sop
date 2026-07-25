export const cashCutsApi = {
    getSummary: async() => window.api.cashCuts.getSummary(),
    getDailySales: async() => window.api.cashCuts.getDailySales(),
    closeCashCut: async() => window.api.cashCuts.close()
}