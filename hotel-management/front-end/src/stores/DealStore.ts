import { create } from "zustand";

// Import interfaces
import { DealData } from "@/interfaces";

// Deal Store State and Actions Interface
interface DealState {
  deals: DealData[];
  totalDeals: number;
  isLoading: boolean;
  pageCount: number;
  error: string | null;
  setDeals: (deals: DealData[]) => void;
}

export const useDealStore = create<DealState>((set) => ({
  deals: [],
  totalDeals: 0,
  pageCount: 1,
  isLoading: false,
  error: null,
  setDeals: (deals) => {
    set({ deals });
  },
}));
