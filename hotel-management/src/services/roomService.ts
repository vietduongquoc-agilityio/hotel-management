import axios from "axios";

const BASE_URL = "http://localhost:1337/api";

// Room Service
export const getRooms = async (
  page: number,
  pageSize: number,
  sort: string
) => {
  try {
    const response = await axios.get(`${BASE_URL}/rooms`, {
      params: { _page: page, _pageSize: pageSize, _sort: sort },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching room data", error);
    throw error;
  }
};

export const createRoom = async (roomData: any) => {
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
