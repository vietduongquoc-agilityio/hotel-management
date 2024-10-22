import axios from "axios";

const BASE_URL = "http://localhost:1337/api";

export const getRooms = async (
  page: number,
  pageSize: number,
  sort: string
) => {
  try {
    const response = await axios.get(`${BASE_URL}/rooms`, {
      params: {
        _page: page,
        _pageSize: pageSize,
        _sort: sort,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching room data", error);
    throw error;
  }
};
