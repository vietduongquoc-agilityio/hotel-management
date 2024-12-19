import axios from "axios";
//InterFace
import { NewRoomData } from "@/interfaces";

const BASE_URL = process.env.VITE_BASE_URL;

export const getRooms = async (
  page: number,
  pageSize: number,
  filters: { [key: string]: string } = {}
) => {
  try {
    const filterParams = Object.keys(filters).reduce((acc, field) => {
      if (filters[field]) {
        acc[`filters[${field}]`] = filters[field];
      }
      return acc;
    }, {} as { [key: string]: string });
    const response = await axios.get(`${BASE_URL}/rooms`, {
      params: {
        ...filterParams,
        "sort[0]": "createdAt:desc",
        "pagination[page]": page,
        "pagination[pageSize]": pageSize,
      },
    });

    if (response.data && response.data.data && response.data.meta.pagination) {
      return {
        rooms: response.data.data,
        pagination: response.data.meta.pagination,
      };
    }
    return response.data;
  } catch (error) {
    return { message: "Error fetching room data", data: null };
  }
};

export const createRoomApi = async (roomData: NewRoomData) => {
  try {
    const response = await axios.post(`${BASE_URL}/rooms`, {
      data: roomData,
    });
    return response.data;
  } catch (error) {
    return { message: "Error in createRoom:", data: null };
  }
};

export const getRoomById = async (roomId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/rooms/${roomId}`);
    return { message: "Room fetched successfully", data: response.data };
  } catch (error) {
    return { message: "Error fetching room details", data: null };
  }
};

export const updateRoom = async (roomId: string, roomData: NewRoomData) => {
  try {
    if (!roomId) throw new Error("Missing document ID for room update.");
    const response = await axios.put(`${BASE_URL}/rooms/${roomId}`, {
      data: roomData,
    });
    return { message: "Room updated successfully", data: response.data };
  } catch (error) {
    return { message: "Error updated room details", data: null };
  }
};

export const deleteRoom = async (roomId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/rooms/${roomId}`);
    return { message: "Room deleted successfully", data: response.data };
  } catch (error) {
    return { message: "Error deleted room details", data: null };
  }
};
