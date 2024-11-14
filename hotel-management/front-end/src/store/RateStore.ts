import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Services
import {
  getRates,
  updateRate,
  createRateApi,
  deleteRate as deleteRateApi,
} from "@/services/rateServices";

// InterFace
import { RateData, NewRateData } from "@/interfaces/Rate";

interface RateState {
  rates: RateData[];
  bedTypeOptions: { value: string; label: string }[];
  loading: boolean;
  fetchRates: (currentPage: number, pageSize: number) => Promise<void>;
  addRate: (rateData: NewRateData) => Promise<void>;
  editRate: (rateId: string, updatedData: NewRateData) => Promise<void>;
  deleteRate: (rateId: string) => Promise<void>;
}

export const useRateStore = create<RateState>()(
  devtools((set) => ({
    bedTypeOptions: [],
    rates: [],
    loading: false,

    fetchRates: async (currentPage, pageSize) => {
      set({ loading: true });
      try {
        const { data } = await getRates(currentPage, pageSize);
        const resultTypeBed = data.map((item: RateData) => ({
          value: item.roomType,
          label: `${item.roomType} Bed`,
        }));
        const updatedRates = data.map((item: RateData) => {
          return {
            ...item,
            totalOfBooked: item.totalOfBooked,
          };
        });
        set({
          rates: updatedRates,
          bedTypeOptions: resultTypeBed,
        });
      } catch (error) {
        console.error("Error fetching rates:", error);
      } finally {
        set({ loading: false });
      }
    },

    addRate: async (rateData) => {
      try {
        const { data } = await createRateApi(rateData);
        const updatedRate = { ...data, totalOfRooms: data.availability };
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
