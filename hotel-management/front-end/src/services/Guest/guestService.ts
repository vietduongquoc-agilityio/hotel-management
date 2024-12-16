import axios from "axios";
import { createStandaloneToast } from "@chakra-ui/react";

// InterFace
import { NewGuestData } from "@/interfaces";

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
export const getGuests = async (page: number, pageSize: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/guests`, {
      params: {
        "sort[0]": "createdAt:desc",
        "pagination[page]": page,
        "pagination[pageSize]": pageSize,
      },
    });
    return response.data;
  } catch (error) {
    return { message: "Failed to fetch guest data", data: null };
  }
};

export const createGuestApi = async (guestData: NewGuestData) => {
  try {
    const response = await axios.post(`${BASE_URL}/guests`, {
      data: guestData,
    });
    return response.data;
  } catch (error) {
    return { message: "Error updated guest details", data: null };
  }
};

export const updateGuest = async (guestId: string, guestData: NewGuestData) => {
  if (!guestId) {
    const errorMessage = "Missing document ID for guest update.";
    showErrorToast(errorMessage);
    throw new Error(errorMessage);
  }
  try {
    const response = await axios.put(`${BASE_URL}/guests/${guestId}`, {
      data: guestData,
    });
    return { message: "Guest updated successfully", data: response.data };
  } catch (error) {
    return { message: "Error updated guest details", data: null };
  }
};

export const deleteGuest = async (guestId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/guests/${guestId}`);
    return { message: "Guest deleted successfully", data: response.data };
  } catch (error) {
    return { message: "Error deleted guest details", data: null };
  }
};