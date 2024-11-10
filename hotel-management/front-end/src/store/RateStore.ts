import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  getRates,
  updateRate,
  createRateApi,
  deleteRate as deleteRateApi,
} from "@/services/rateServices";
import { RateData, NewRateData } from "@/interfaces/Rate";

interface RateState {
  rates: RateData[];
  loading: boolean;
  fetchRates: (currentPage: number, pageSize: number) => Promise<void>;
  addRate: (rateData: NewRateData) => Promise<void>;
  editRate: (rateId: string, updatedData: NewRateData) => Promise<void>;
  deleteRate: (rateId: string) => Promise<void>;
  updateRateAvailability: (roomType: string, change: number) => void;
}

export const useRateStore = create<RateState>()(
  devtools((set) => ({
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

    deleteRate: async (rateId) => {
      try {
        await deleteRateApi(rateId);
        set((state) => ({
          rates: state.rates.filter((rate) => rate.documentId !== rateId),
        }));
      } catch (error) {
        console.error("Error deleting rate:", error);
      }
    },

    updateRateAvailability: (roomType, change) => {
      set((state) => ({
        rates: state.rates.map((rate) =>
          rate.roomType === roomType
            ? { ...rate, availability: rate.availability + change }
            : rate
        ),
      }));
    },
  }))
);
