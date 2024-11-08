import { create } from "zustand";

// Services
import {
  getRooms,
  createRoomApi,
  updateRoom,
  deleteRoom,
} from "@/services/roomService";

// InterFace
import { RoomData, NewRoomData } from "@/Interface/Room";

interface RoomState {
  rooms: RoomData[];
  totalRooms: number;
  pageCount: number;
  availableRooms: number;
  bookedRooms: number;
  loading: boolean;
  totalOfBooked: number;
  fetchRooms: (
    currentPage: number,
    pageSize: number,
    field?: string,
    value?: string
  ) => Promise<void>;
  addRoom: (roomData: NewRoomData) => Promise<void>;
  editRoom: (roomId: string, updatedData: NewRoomData) => Promise<void>;
  deleteRoom: (roomId: string) => Promise<void>;
  calculateRoomCounts: (rooms: RoomData[]) => void;
  setTotalOfBooked: (count: number) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  totalOfBooked: 0,
  setTotalOfBooked: (count: number) => set({ totalOfBooked: count }),
  rooms: [],
  totalRooms: 0,
  pageCount: 1,
  availableRooms: 0,
  bookedRooms: 0,
  loading: false,

  fetchRooms: async (currentPage, pageSize, field, value) => {
    set({ loading: true });
    try {
      const { rooms, pagination } = await getRooms(
        currentPage,
        pageSize,
        field,
        value
      );
      set({
        rooms,
        totalRooms: pagination.total,
        pageCount: pagination.pageCount,
      });
      useRoomStore.getState().calculateRoomCounts(rooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      set({ loading: false });
    }
  },

  addRoom: async (roomData) => {
    try {
      const { data } = await createRoomApi(roomData);
      set((state) => ({ rooms: [data, ...state.rooms] }));
    } catch (error) {
      console.error("Error adding room:", error);
    }
  },

  editRoom: async (roomId, updatedData) => {
    try {
      await updateRoom(roomId, updatedData);
      set((state) => ({
        rooms: state.rooms.map((room) =>
          room.documentId === roomId ? { ...room, ...updatedData } : room
        ),
      }));
    } catch (error) {
      console.error("Error editing room:", error);
    }
  },

  deleteRoom: async (roomId) => {
    try {
      await deleteRoom(roomId);
      set((state) => ({
        rooms: state.rooms.filter((room) => room.documentId !== roomId),
      }));
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  },

  calculateRoomCounts: (rooms) => {
    const availableRooms = rooms.filter(
      (room) => room.roomStatus === "Available"
    ).length;
    const bookedRooms = rooms.filter(
      (room) => room.roomStatus === "Booked"
    ).length;
    set({ availableRooms, bookedRooms });
  },
}));
