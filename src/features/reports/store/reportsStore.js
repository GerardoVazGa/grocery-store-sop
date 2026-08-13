import { create } from "zustand";

export const useReportsPeriodStore = create((set) => ({
    period: "day",
    setPeriod: (newPeriod) => set({ period: newPeriod })
}))