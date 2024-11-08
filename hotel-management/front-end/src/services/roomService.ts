import axios from "axios";

//InterFace
import { NewRoomData } from "@/Interface/Room";

const BASE_URL = process.env.VITE_BASE_URL;

export const getRooms = async (
  page: number,
  pageSize: number,
  field?: string,
  value?: string
) => {
  try {
    const filters = field && value ? { [`filters[${field}]`]: value } : {};
    const response = await axios.get(`${BASE_URL}/rooms`, {
      params: {
        ...filters,
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
