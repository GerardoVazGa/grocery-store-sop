import { create } from "zustand"
import { cashCutsApi } from "../api/cashCuts.api.js"

export const useCashCutStore = create((set) => ({
    isClosed: false,
    isClosing: false, // isLoading state
    error: null,

    closeCashCut: async () => {
        try {
            set({ isClosing: true, error: null });
            await cashCutsApi.closeCashCut();
            set({ isClosed: true});
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ isClosing: false });
        }
    },

    reset: () => set({ isClosed: false, error: null }) // reset closeCashCut
}))