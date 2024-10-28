/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import RateData from "../components/interfaceTypes/rateTypes";

const BASE_URL = "http://localhost:1337/api";

// Rate Service
export const getRates = async (
  page: number,
  pageSize: number,
  sort: string
) => {
  try {
    const response = await axios.get(`${BASE_URL}/rates`, {
      params: { _page: page, _pageSize: pageSize, _sort: sort },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching rate data", error);
    throw error;
  }
};

// Check the list of rooms using a `rate` tool
export const getRoomsUsingRate = async (rateId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/rooms`, {
      params: { rateId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms using rate", error);
    throw error;
  }
};

export const createRate = async (rateData: RateData) => {
  const { id, ...data } = rateData;
  try {
    const response = await axios.post(`${BASE_URL}/rates`, {
      data: data,
    });
    return response.data;
  } catch (error) {
    console.error("Error in createRate:", error);
    throw error;
  }
};

export const updateRate = async (id: string, rateData: RateData) => {
  try {
    if (!id) throw new Error("Rate ID is required for updating.");
    const response = await axios.put(`${BASE_URL}/rates/${id}`, rateData);
    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in updateRate:", error);
    throw error;
  }
};

export const deleteRate = async (rateId: string) => {
  const response = await axios.delete(`${BASE_URL}/rates/:${rateId}`);
  return response.data;
};
