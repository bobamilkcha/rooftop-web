import { create } from "zustand";

interface ElectricBillState {
    steps: number,
    setSteps: (step : number)=> void,

    address: string | null // address
    setAddress: (add: string) => void

    monthlyElectricBill: number | null // monthly-bill
    setMonthlyElectricBill: (bill: number) => void

    buildingType: string | null; // tariff-category pt.1
    setBuildingType: (type: string) => void;

    tariff: string | null; // tariff-category pt.2
    setTariff: (tariff: string) => void;

    peakPowerDemand: number | null // peak-power-demand
    setPeakPowerDemand: (value: number | null) => void;

    peakHourRatio: string | null; // operation-hours
    setPeakHourRatio: (value: string) => void;

    storageHours: string | null; // storage-hours NOT NEEDED FOR NOW
    setStorageHours: (value: string) => void;

    quote: string | null; // storage-hours NOT NEEDED FOR NOW
    setQuote: (value: string) => void;
}

export const useElectricBillStore = create<ElectricBillState>((set) => ({
    steps: 2,
    setSteps: (step) => set({ steps: step }),

    address: null,
    setAddress: (add) => set({ address: add }),

    monthlyElectricBill: null,
    setMonthlyElectricBill: (bill) => set({ monthlyElectricBill: bill }),

    buildingType: null,
    setBuildingType: (type) => {
        const mappedType = type === "Perindustrian" ? "Industrial" : type;
        set({ buildingType: mappedType });
    },

    tariff: null,
    setTariff: (tariff) => set({ tariff: "Tariff "+tariff }),

    peakPowerDemand: null,
    setPeakPowerDemand: (value) => set({ peakPowerDemand: value }),

    peakHourRatio: null,
    setPeakHourRatio: (value) => set({ peakHourRatio: value }),
    
    storageHours: null,
    setStorageHours: (hours) => set({ storageHours: hours }),

    quote: null,
    setQuote: (data) => set({ quote: data }),
}))