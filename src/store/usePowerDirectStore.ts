import { create } from "zustand";

interface PowerDirectState {
    preference: string | null;
    setPreference: (type: string) => void;
    dayUsage: string | null;
    setDayUsage: (type: string) => void;
}

export const usePowerDirectSTore = create<PowerDirectState>((set) => ({
    preference: "",
    setPreference: (type) => set({ preference: type }),
    dayUsage: "",
    setDayUsage: (type) => set({ dayUsage: type }),
}))