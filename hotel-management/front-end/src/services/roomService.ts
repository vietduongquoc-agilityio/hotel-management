/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import RoomData from "../components/interfaceTypes/roomTypes";

const BASE_URL = "http://localhost:1337/api";

export const getRooms = async (page: number, pageSize: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/rooms`, {
      params: {
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

// export const createRoom = async (roomData: RoomData) => {
//   const { documentId, ...data } = roomData;
//   try {
//     const response = await axios.post(`${BASE_URL}/rooms`, {
//       data: data,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error in createRate:", error);
//     throw error;
//   }
// };


export const createRoom = async (roomData: RoomData) => {
  const response = await axios.post(`${BASE_URL}/rooms`, roomData); 
  return response.data;
};


export const getRoomById = (roomId: string) =>
  axios.get(`${BASE_URL}/rooms/${roomId}`).then((response) => response.data);

export const updateRoom = (roomId: string, roomData: any) =>
  axios
    .put(`${BASE_URL}/rooms/${roomId}`, roomData)
    .then((response) => response.data);

export const deleteRoom = async (roomId: string) => {
  const room = await getRoomById(roomId);
  if (room.status !== "Available") {
    throw new Error("Room must be 'Available' to delete.");
  }
  const response = await axios.delete(`${BASE_URL}/rooms/${roomId}`);
  return response.data;
};
