import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Import guest services
import {
  getGuests,
  createGuestApi,
  updateGuest,
  deleteGuest,
} from "@/services";

// Import interfaces
import { NewGuestData, GuestData } from "@/interfaces";

// Guest Store State and Actions Interface
interface GuestState {
  guests: GuestData[];
  totalGuests: number;
  isLoading: boolean;
  error: string | null;
  fetchGuests: (page: number, pageSize: number) => Promise<void>;
  createGuest: (guestData: NewGuestData) => Promise<void>;
  updateGuest: (guestId: string, guestData: NewGuestData) => Promise<void>;
  deleteGuest: (guestId: string) => Promise<void>;
}

// Create Guest Store
export const useGuestStore = create<GuestState>()(
  devtools((set) => ({
    guests: [],
    totalGuests: 0,
    isLoading: false,
    error: null,

    // Fetch guests from API
    fetchGuests: async (page, pageSize) => {
      set({ isLoading: true });
      try {
        const data = await getGuests(page, pageSize);
        if (data?.data) {
          set({
            guests: data.data,
            totalGuests: data.meta.pagination.total,
            isLoading: false,
          });
        } else {
          set({ error: data.message, isLoading: false });
        }
      } catch (error) {
        set({ error: "Failed to fetch guests.", isLoading: false });
      }
    },

    // Create a new guest
    createGuest: async (guestData) => {
      set({ isLoading: true, error: null });
      try {
        const response = await createGuestApi(guestData);
        if (response?.data) {
          set((state) => ({
            guests: [response.data, ...state.guests],
            totalGuests: state.totalGuests + 1,
            isLoading: false,
          }));
        } else {
          set({ error: response.message, isLoading: false });
        }
      } catch (error) {
        set({ error: "Failed to create guest.", isLoading: false });
      }
    },

    editGuest: async (guestId: string, guestData: NewGuestData) => {
      try {
        await updateGuest(guestId, guestData);
        set((state) => ({
          guests: state.guests.map((guest) =>
            guest.documentId === guestId ? { ...guest, ...guestData } : guest
          ),
        }));
      } catch (error) {
        console.error("Error editing rate:", error);
      }
    },

    // Delete a guest
    deleteRate: async (guestId: string) => {
      try {
        await deleteGuest(guestId);
        set((state) => ({
          guests: state.guests.filter((guest) => guest.documentId !== guestId),
        }));
      } catch (error) {
        console.error("Error deleting rate:", error);
      }
    },
  }))
);
