import { create } from "zustand"
import { cashCutsApi } from "../api/cashCuts.api.js"

export const useCashCutStore = create((set, get) => ({
    activeCashCut: null,
    isClosed: false,
    isLoading: true,
    isOpening: false,
    isClosing: false,
    isReopening: false,
    error: null,
    lastClosedCashCutId: null,

    checkActiveCashCut: async () => {
        try {
            const activeCashCut = await cashCutsApi.getActiveCashCut()
            set({activeCashCut, isLoading: false})

        } catch (error) {
            set({ error: error.message, isLoading: false })
        }
    },

    openCashCut: async (openingAmount) => {
        try {
            set({ isOpening: true, error: null })
            const activeCashCut = await cashCutsApi.openCashCut(openingAmount)
            set({ activeCashCut, isOpening: false, isClosed: false, lastClosedCashCutId: null })

        } catch (error) {
            set({ error: error.message, isOpening: false })
        }
    },

    closeCashCut: async (countedCash) => {
        try {
            set({ isClosing: true, error: null })
            const { activeCashCut } = get()
            await cashCutsApi.closeCashCut(activeCashCut.id, countedCash)
            set({ 
                isClosed: true,
                lastClosedCashCutId: activeCashCut.id,
                activeCashCut: null,
            })

        } catch (error) {
            set({ error: error.message })
        } finally {
            set({ isClosing: false })
        }
    },

    reset: async () => {
        try {
            const { lastClosedCashCutId } = get()

            if(lastClosedCashCutId) {
                const activeCashCut = await cashCutsApi.reopenCashCut(lastClosedCashCutId)
                set({ activeCashCut, isClosed: false, lastClosedCashCutId: null })
            } else {
                set({isClosed: false, error: null})
            }
        } catch (error) {
            set({ error: error.message })
        } finally {
            set({ isReopening: false })
        }
    }
}))