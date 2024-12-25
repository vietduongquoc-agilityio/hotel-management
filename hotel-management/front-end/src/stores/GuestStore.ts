import { create } from "zustand";

// Interfaces
import { GuestData } from "@/interfaces";

// Utils
import { generateCode } from "@/utils";

interface GuestState {
  guests: GuestData[];
  totalGuests: number;
  isLoading: boolean;
  error: string | null;
  setGuests: (guests: GuestData[]) => void;
  reservationNumber: number;
  guestNameOptions: { value: string; label: string }[];
  stayOptions: { value: string; label: string }[];
  priceOptions: { value: string; label: string }[];
  setGuestNameOptions: (guests: GuestData[]) => void;
  setStayOptions: (guests: GuestData[]) => void;
  setPriceOptions: (guests: GuestData[]) => void;
  setReservationNumber: (number: number) => void;
  saveGuests: (
    data: GuestData[],
    referenceNumber: number,
    guestName: { value: string; label: string }[],
    stay: { value: string; label: string }[],
    price: { value: string; label: string }[]
  ) => void;
}

const defaultRegistrationNumber = Number(generateCode());

export const useGuestStore = create<GuestState>((set) => ({
  guests: [],
  reservationNumber: defaultRegistrationNumber,
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
    ).map((price) => ({ value: price, label: price }));
    set({ priceOptions: uniquePrices });
  },

  setReservationNumber(number) {
    set(() => ({ reservationNumber: number }));
  },

  saveGuests: (data, referenceNumber, guestName, stay, price) => {
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
