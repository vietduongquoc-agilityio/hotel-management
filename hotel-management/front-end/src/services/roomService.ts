/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { NewRoomData } from "../constants/interfaceTypes/roomTypes";

const BASE_URL = process.env.VITE_BASE_URL;

export const getRooms = async (page: number, pageSize: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/rooms`, {
      params: {
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
    } else {
      throw new Error("Unexpected data format");
    }
  } catch (error) {
    console.error("Error fetching room data", error);
    throw error;
  }
};

export const createRoomApi = async (roomData: NewRoomData) => {
  try {
    const response = await axios.post(`${BASE_URL}/rooms`, {
      data: roomData,
    });
    return response.data;
  } catch (error) {
    console.error("Error in createRoom:", error);
    throw error;
  }
};

export const getRoomById = (roomId: string) =>
  axios.get(`${BASE_URL}/rooms/${roomId}`).then((response) => response.data);

export const updateRoom = (roomId: string, roomData: NewRoomData) => {
  if (!roomId) throw new Error("Missing document ID for room update.");
  return axios
    .put(`${BASE_URL}/rooms/${roomId}`, { data: roomData })
    .then((response) => response.data);
};

export const deleteRoom = async (roomId: string) => {
  const response = await axios.delete(`${BASE_URL}/rooms/${roomId}`);
  return response.data;
};
