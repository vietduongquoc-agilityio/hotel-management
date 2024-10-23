import axios from "axios";

const BASE_URL = "http://localhost:1337/api";

export const getRates = async (page: number, pageSize: number, sort: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/rates`, {
      params: {
        _page: page,
        _pageSize: pageSize,
        _sort: sort,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching rate data", error);
    throw error;
  }
};
