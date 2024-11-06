import { create } from "zustand";
import { NewRoomData, RoomData } from "@/constant/InterfaceTypes/RoomTypes";
import { getRates } from "@/services/rateServices";

interface RoomStore {
  rates: RoomData[];
  addRate: (rate: NewRoomData) => void;
  updateRate: (updatedRate: RoomData) => void;
  deleteRate: (rateId: string) => void;
  fetchRates: () => Promise<void>;
}

export const useRoomStore = create<RoomStore>((set) => ({
  rates: [],
  addRate: (rate: NewRoomData) =>
    set((state) => ({
      rates: [...state.rates, { ...rate, documentId: "" }],
    })),
  updateRate: (updatedRate: RoomData) =>
    set((state) => ({
      rates: state.rates.map((rate) =>
        rate.documentId === updatedRate.documentId ? updatedRate : rate
      ),
    })),
  deleteRate: (rateId: string) =>
    set((state) => ({
      rates: state.rates.filter((rate) => rate.documentId !== rateId),
    })),
  fetchRates: async () => {
    const response = await getRates(1, 10);
    set({ rates: response.data });
  },
}));
