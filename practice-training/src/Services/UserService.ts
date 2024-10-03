import axios from "axios";
import type { AxiosError } from "axios";

const USERS_API_URL = "https://66f122ec41537919154fae44.mockapi.io/albums";

interface LoginResponse {
  custom_attributes?: string;
}

function isAxiosError(error: any): error is AxiosError {
  return error.isAxiosError === true;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<{ data: LoginResponse }> => {
  try {
    const response = await axios.post<{ data: LoginResponse }>(
      `${USERS_API_URL}/user`,
      {
        email,
        password,
      }
    );

    const { data } = response.data;
    if (data) {
      return { data };
    }
    return { data: {} };
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error("Login Fail: " + error.message);
    } else {
      throw new Error("Unexpected error.");
    }
  }
};
