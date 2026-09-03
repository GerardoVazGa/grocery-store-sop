export const cashCutsApi = {
    getSummary: async(cashCutId) => window.api.cashCuts.getSummary(cashCutId),
    getCashCutSales: async(cashCutId) => window.api.cashCuts.getCashCutSales(cashCutId),
    getActiveCashCut: async() => window.api.cashCuts.getActive(),
    openCashCut: async(openingAmount) => window.api.cashCuts.open(openingAmount),
    reopenCashCut: async(cashCutId) => window.api.cashCuts.reopen(cashCutId),
    getCashCutById: async(id) => window.api.cashCuts.getById(id),
    closeCashCut: async(cashCutId, countedCash) => window.api.cashCuts.close(cashCutId, countedCash)
}