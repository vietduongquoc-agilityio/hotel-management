import { create } from "zustand";
import { getRates, updateRate, createRateApi } from "@/services/rateServices";
import { RateData, NewRateData } from "@/constant/InterfaceTypes/RateTypes";

interface RateState {
  rates: RateData[];
  loading: boolean;
  fetchRates: (currentPage: number, pageSize: number) => Promise<void>;
  addRate: (rateData: NewRateData) => Promise<void>;
  editRate: (rateId: string, updatedData: NewRateData) => Promise<void>;
  deleteRate: (rateId: string) => void;
}

export const useRateStore = create<RateState>((set) => ({
  rates: [],
  loading: false,

  fetchRates: async (currentPage, pageSize) => {
    set({ loading: true });
    try {
      const { data } = await getRates(currentPage, pageSize);
      set({ rates: data });
    } catch (error) {
      console.error("Error fetching rates:", error);
    } finally {
      set({ loading: false });
    }
  },

  addRate: async (rateData) => {
    try {
      const { data } = await createRateApi(rateData);
      const updatedRate = { ...data, total: data.availability };
      set((state) => ({ rates: [updatedRate, ...state.rates] }));
    } catch (error) {
      console.error("Error adding rate:", error);
    }
  },

  editRate: async (rateId, updatedData) => {
    try {
      await updateRate(rateId, updatedData);
      set((state) => ({
        rates: state.rates.map((rate) =>
          rate.documentId === rateId ? { ...rate, ...updatedData } : rate
        ),
      }));
    } catch (error) {
      console.error("Error editing rate:", error);
    }
  },

  deleteRate: (rateId) => {
    set((state) => ({
      rates: state.rates.filter((rate) => rate.documentId !== rateId),
    }));
  },
}));
