import { create } from "zustand";

// Interfaces
import { RoomData } from "@/interfaces";

// Constant
import { setBedTypeOptions } from "@/constants";

interface RoomState {
  rooms: RoomData[];
  totalRooms: number;
  availableRooms: number;
  bookedRooms: number;
  isLoading: boolean;
  // Store bedType options
  bedTypeOptions: string[];
  setBedTypeOptions: (rates: setBedTypeOptions[]) => void;
  setRooms: (rooms: RoomData[]) => void;
  calculateRoomCounts: (rooms: RoomData[]) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  rooms: [],
  totalRooms: 0,
  availableRooms: 0,
  bookedRooms: 0,
  isLoading: false,
  bedTypeOptions: [],

  setBedTypeOptions: (rates) => {
    const uniqueBedTypes = Array.from(
      new Set(rates.map((rate) => rate.roomType))
    );
    set({ bedTypeOptions: uniqueBedTypes });
  },

  setRooms: (rooms) => {
    set({ rooms });
  },

  calculateRoomCounts: (rooms) => {
    const availableRooms = rooms.filter(
      (room) => room.roomStatus === "Available"
    ).length;
    const bookedRooms = rooms.filter(
      (room) => room.roomStatus === "Booked"
    ).length;

    set({
      availableRooms,
      bookedRooms,
      totalRooms: rooms.length,
    });
  },
}));
