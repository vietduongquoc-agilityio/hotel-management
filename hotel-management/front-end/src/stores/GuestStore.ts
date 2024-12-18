import { create } from "zustand";

// Import interfaces
import { GuestData } from "@/interfaces";

// Guest Store State and Actions Interface
interface GuestState {
  guests: GuestData[];
  totalGuests: number;
  isLoading: boolean;
  error: string | null;
  reservationNumber: { value: string; label: string }[];
  setGuests: (guests: GuestData[]) => void;
  saveGuests: (
    data: GuestData[],
    referenceNumber: { value: string; label: string }[]
  ) => void;
}

export const useGuestStore = create<GuestState>((set) => ({
  guests: [],
  reservationNumber: [],
  totalGuests: 0,
  isLoading: false,
  error: null,
  saveGuests: (
    data: GuestData[],
    referenceNumber: { value: string; label: string }[]
  ) => {
    set({
      guests: data,
      reservationNumber: referenceNumber,
    });
  },

  setGuests: (guests) => {
    set({ guests });
  },
}));
