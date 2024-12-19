import axios from "axios";
import { createStandaloneToast } from "@chakra-ui/react";

// Interfaces
import { NewRateData } from "@/interfaces";

const BASE_URL = process.env.VITE_BASE_URL;

const { toast } = createStandaloneToast();

const showErrorToast = (message: string) => {
  toast({
    title: "Error",
    description: message,
    status: "error",
    duration: 3000,
    isClosable: true,
  });
};

// Rate Service
export const getRates = async (
  page: number,
  pageSize: number,
) => {
  try {
    const response = await axios.get(`${BASE_URL}/rates`, {
      params: {
        "sort[0]": "createdAt:desc",
        "pagination[page]": page,
        "pagination[pageSize]": pageSize,
      },
    });
    if (response.data && response.data.data && response.data.meta.pagination) {
      return {
        rates: response.data.data,
        pagination: response.data.meta.pagination,
      };
    }
    return response.data;
  } catch (error) {
    return { message: "Error fetching rate data", data: null };
  }
};

export const createRateApi = async (rateData: NewRateData) => {
  try {
    const response = await axios.post(`${BASE_URL}/rates`, {
      data: rateData,
    });
    return response.data;
  } catch (error) {
    return { message: "Error updated rate details", data: null };
  }
};

export const updateRate = async (rateId: string, rateData: NewRateData) => {
  if (!rateId) {
    const errorMessage = "Missing document ID for rate update.";
    showErrorToast(errorMessage);
    throw new Error(errorMessage);
  }
  try {
    const response = await axios.put(`${BASE_URL}/rates/${rateId}`, {
      data: rateData,
    });
    return { message: "Rate updated successfully", data: response.data };
  } catch (error) {
    return { message: "Error updated rate details", data: null };
  }
};

export const deleteRate = async (rateId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/rates/${rateId}`);
    return { message: "Rate deleted successfully", data: response.data };
  } catch (error) {
    return { message: "Error deleted rate details", data: null };
  }
};
