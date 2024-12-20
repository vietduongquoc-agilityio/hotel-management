import { create } from "zustand";

// Import interfaces
import { GuestData } from "@/interfaces";

interface GuestState {
  guests: GuestData[];
  totalGuests: number;
  isLoading: boolean;
  error: string | null;
  reservationNumber: { value: string; label: string }[];
  setGuests: (guests: GuestData[]) => void;
  guestNameOptions: { value: string; label: string }[];
  stayOptions: { value: string; label: string }[];
  priceOptions: { value: string; label: string }[];
  setGuestNameOptions: (guests: GuestData[]) => void;
  setStayOptions: (guests: GuestData[]) => void;
  setPriceOptions: (guests: GuestData[]) => void;
  saveGuests: (
    data: GuestData[],
    referenceNumber: { value: string; label: string }[],
    guestName: { value: string; label: string }[],
    stay: { value: string; label: string }[],
    price: { value: string; label: string }[]
  ) => void;
}

export const useGuestStore = create<GuestState>((set) => ({
  guests: [],
  reservationNumber: [],
  totalGuests: 0,
  isLoading: false,
  error: null,
  guestNameOptions: [],
  stayOptions: [],
  priceOptions: [],
  setGuestNameOptions: (guests) => {
    const uniqueGuestNames = Array.from(
      new Set(guests.map((guest) => guest.guestName))
    ).map((name) => ({ value: name, label: name }));
    set({ guestNameOptions: uniqueGuestNames });
  },
  setStayOptions: (guests) => {
    const uniqueStays = Array.from(
      new Set(guests.map((guest) => guest.stay.toString()))
    ).map((name) => ({ value: name, label: name }));
    set({ stayOptions: uniqueStays });
  },
  setPriceOptions: (guests) => {
    const uniquePrices = Array.from(
      new Set(guests.map((guest) => guest.price.toString()))
    ).map((name) => ({ value: name, label: name }));
    set({ priceOptions: uniquePrices });
  },
  saveGuests: (
    data: GuestData[],
    referenceNumber: { value: string; label: string }[],
    guestName: { value: string; label: string }[],
    stay: { value: string; label: string }[],
    price: { value: string; label: string }[] ,
  ) => {
    set({
      guests: data,
      guestNameOptions: guestName,
      priceOptions: price,
      stayOptions: stay,
      reservationNumber: referenceNumber,
    });
  },

  setGuests: (guests) => {
    set({ guests });
  },
}));
