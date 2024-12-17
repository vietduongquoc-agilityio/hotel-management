// import { create } from "zustand";

// // Services
// import { createRoomApi, updateRoom, deleteRoom } from "@/services";

// // Interfaces
// import { RoomData, NewRoomData } from "@/interfaces";

// // Constant
// import { setBedTypeOptions } from "@/constants";

// interface RoomState {
//   rooms: RoomData[];
//   totalRooms: number;
//   availableRooms: number;
//   bookedRooms: number;
//   isLoading: boolean;
//   // Store bedType options
//   bedTypeOptions: string[];
//   setBedTypeOptions: (rates: setBedTypeOptions[]) => void;
//   addRoom: (roomData: NewRoomData) => Promise<void>;
//   editRoom: (roomId: string, updatedData: NewRoomData) => Promise<void>;
//   deleteRoom: (roomId: string) => Promise<void>;
//   calculateRoomCounts: (rooms: RoomData[]) => void;
// }

// export const useRoomStore = create<RoomState>((set) => ({
//   rooms: [],
//   totalRooms: 0,
//   availableRooms: 0,
//   bookedRooms: 0,
//   isLoading: false,
//   bedTypeOptions: [],
  
//   setBedTypeOptions: (rates) => {
//     const uniqueBedTypes = Array.from(
//       new Set(rates.map((rate) => rate.roomType))
//     );
//     set({ bedTypeOptions: uniqueBedTypes });
//   },

//   addRoom: async (roomData) => {
//     try {
//       const { data } = await createRoomApi(roomData);
//       set((state) => ({ rooms: [data, ...state.rooms] }));
//     } catch (error) {
//       console.error("Error adding room:", error);
//     }
//   },

//   editRoom: async (roomId, updatedData) => {
//     try {
//       await updateRoom(roomId, updatedData);
//       set((state) => ({
//         rooms: state.rooms.map((room) =>
//           room.documentId === roomId ? { ...room, ...updatedData } : room
//         ),
//       }));
//     } catch (error) {
//       console.error("Error editing room:", error);
//     }
//   },

//   deleteRoom: async (roomId) => {
//     try {
//       await deleteRoom(roomId);
//       set((state) => ({
//         rooms: state.rooms.filter((room) => room.documentId !== roomId),
//       }));
//     } catch (error) {
//       console.error("Error deleting room:", error);
//     }
//   },

//   calculateRoomCounts: (rooms) => {
//     const availableRooms = rooms.filter(
//       (room) => room.roomStatus === "Available"
//     ).length;
//     const bookedRooms = rooms.filter(
//       (room) => room.roomStatus === "Booked"
//     ).length;

//     set({
//       availableRooms,
//       bookedRooms,
//     });
//   },
// }));

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
