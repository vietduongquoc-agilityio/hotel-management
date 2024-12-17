import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Services
import {
  // getRates,
  updateRate,
  createRateApi,
  deleteRate as deleteRateApi,
} from "@/services";

// InterFace
import { RateData, NewRateData } from "@/interfaces";

interface RateState {
  rates: RateData[];
  bedTypeOptions: { value: string; label: string }[];
  isLoading: boolean;
  fetchRates: (currentPage: number, pageSize: number) => Promise<void>;
  addRate: (rateData: NewRateData) => Promise<void>;
  editRate: (rateId: string, updatedData: NewRateData) => Promise<void>;
  deleteRate: (rateId: string) => Promise<void>;
  saveRate: (
    data: RateData[],
    bedType: { value: string; label: string }[]
  ) => void;
}

export const useRateStore = create<RateState>()(
  devtools((set) => ({
    bedTypeOptions: [],
    rates: [],
    isLoading: false,
    saveRate: (
      data: RateData[],
      bedType: { value: string; label: string }[]
    ) => {
      set({
        rates: data,
        bedTypeOptions: bedType,
      });
    },

    addRate: async (rateData) => {
      try {
        const { data } = await createRateApi(rateData);
        const updatedRate = { ...data, totalOfRooms: data.totalOfRooms };
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
  }))
);
