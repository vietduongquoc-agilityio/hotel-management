import { create } from "zustand";

// Import interfaces
import { GuestData } from "@/interfaces";

// Guest Store State and Actions Interface
interface GuestState {
  guests: GuestData[];
  totalGuests: number;
  isLoading: boolean;
  error: string | null;
  setGuests: (guests: GuestData[]) => void;
}

export const useGuestStore = create<GuestState>((set) => ({
  guests: [],
  totalGuests: 0,
  isLoading: false,
  error: null,

  setGuests: (guests) => {
    set({ guests });
  },
}));
