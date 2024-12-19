import { create } from "zustand";
import { devtools } from "zustand/middleware";

// InterFace
import { RateData } from "@/interfaces";

interface RateState {
  rates: RateData[];
  bedTypeOptions: { value: string; label: string }[];
  isLoading: boolean;
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
  }))
);
