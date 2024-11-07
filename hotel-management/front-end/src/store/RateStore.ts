import { create } from "zustand";
import { getRates } from "@/services/rateServices";
import { RateData } from "@/constant/InterfaceTypes/RateTypes";

interface RateState {
  rates: RateData[];
  loading: boolean;
  fetchRates: (currentPage: number, pageSize: number) => Promise<void>;
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
}));
