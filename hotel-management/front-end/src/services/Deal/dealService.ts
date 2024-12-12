import axios from "axios";
import { createStandaloneToast } from "@chakra-ui/react";

// InterFace
import { NewDealData } from "@/interfaces";

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

// Guest Service
export const getDeals = async (page: number, pageSize: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/deals`, {
      params: {
        "sort[0]": "createdAt:desc",
        "pagination[page]": page,
        "pagination[pageSize]": pageSize,
      },
    });
    return response.data;
  } catch (error) {
    return { message: "Failed to fetch deal data", data: null };
  }
};

export const createDealApi = async (dealData: NewDealData) => {
  try {
    const response = await axios.post(`${BASE_URL}/deals`, {
      data: dealData,
    });
    return response.data;
  } catch (error) {
    return { message: "Error updated deal details", data: null };
  }
};

export const updateDeal = async (dealId: string, dealData: NewDealData) => {
  if (!dealId) {
    const errorMessage = "Missing document ID for deal update.";
    showErrorToast(errorMessage);
    throw new Error(errorMessage);
  }
  try {
    const response = await axios.put(`${BASE_URL}/deals/${dealId}`, {
      data: dealData,
    });
    return { message: "Deal updated successfully", data: response.data };
  } catch (error) {
    return { message: "Error updated deal details", data: null };
  }
};

export const deleteDeal = async (dealId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/deals/${dealId}`);
    return { message: "Deal deleted successfully", data: response.data };
  } catch (error) {
    return { message: "Error deleted deal details", data: null };
  }
};
