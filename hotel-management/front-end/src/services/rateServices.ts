/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import {RateData} from "@/Constants/InterfaceTypes/RateTypes";

const BASE_URL = process.env.VITE_BASE_URL;
// Rate Service
export const getRates = async (page: number, pageSize: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/rates`, {
      params: { _page: page, _pageSize: pageSize },
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
  const { documentId, ...data } = rateData;
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

export const updateRate = (rateId: string, rateData: RateData) =>
  axios
    .put(`${BASE_URL}/rooms/${rateId}`, rateData)
    .then((response) => response.data);

export const deleteRate = async (rateId: string) => {
  const response = await axios.delete(`${BASE_URL}/rates/${rateId}`);
  return response.data;
};
