import axios from "axios";
import {
  getRates,
  createRateApi,
  updateRate,
  deleteRate,
} from "@/services/Rate/rateServices";

// InterFace
import { NewRateData } from "@/interfaces";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const BASE_URL = process.env.VITE_BASE_URL;

describe("rateService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getRates", () => {
    it("should return rates data successfully", async () => {
      const mockResponse = {
        data: {
          data: [{ id: "1", name: "Rate 1" }],
          meta: { pagination: { page: 1 } },
        },
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const response = await getRates(1, 10);

      expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}/rates`, {
        params: {
          "sort[0]": "createdAt:desc",
          "pagination[page]": 1,
          "pagination[pageSize]": 10,
        },
      });
      expect(response).toEqual({
        rates: mockResponse.data.data,
        pagination: mockResponse.data.meta.pagination,
      });
    });

    it("should handle error when fetching rates", async () => {
      mockedAxios.get.mockRejectedValue(new Error("Network Error"));

      const response = await getRates(1, 10);

      expect(mockedAxios.get).toHaveBeenCalled();
      expect(response).toEqual({
        message: "Error fetching rate data",
        data: null,
      });
    });
  });

  describe("createRateApi", () => {
    it("should create a new rate successfully", async () => {
      const newRateData = { roomType: "Deluxe", rate: 100 } as NewRateData;
      const mockResponse = { data: { id: "1", ...newRateData } };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const response = await createRateApi(newRateData);

      expect(mockedAxios.post).toHaveBeenCalledWith(`${BASE_URL}/rates`, {
        data: newRateData,
      });
      expect(response).toEqual(mockResponse.data);
    });

    it("should handle error when creating a rate", async () => {
      mockedAxios.post.mockRejectedValue(new Error("Network Error"));

      const response = await createRateApi({
        roomType: "Deluxe",
        rate: 100,
      } as NewRateData);

      expect(mockedAxios.post).toHaveBeenCalled();
      expect(response).toEqual({
        message: "Error updated rate details",
        data: null,
      });
    });
  });

  describe("updateRate", () => {
    it("should update a rate successfully", async () => {
      const rateId = "1";
      const updatedRateData = { roomType: "Deluxe", rate: 150 } as NewRateData;
      const mockResponse = { data: { id: rateId, ...updatedRateData } };

      mockedAxios.put.mockResolvedValue(mockResponse);

      const response = await updateRate(rateId, updatedRateData);

      expect(mockedAxios.put).toHaveBeenCalledWith(
        `${BASE_URL}/rates/${rateId}`,
        { data: updatedRateData }
      );
      expect(response).toEqual({
        message: "Rate updated successfully",
        data: mockResponse.data,
      });
    });

    it("should throw an error for missing rate ID", async () => {
      const updatedRateData = { roomType: "Deluxe", rate: 150 } as NewRateData;

      await expect(updateRate("", updatedRateData)).rejects.toThrow(
        "Missing document ID for rate update."
      );
    });

    it("should handle error when updating a rate", async () => {
      const rateId = "1";
      const updatedRateData = { roomType: "Deluxe", rate: 150 } as NewRateData;

      mockedAxios.put.mockRejectedValue(new Error("Network Error"));

      const response = await updateRate(rateId, updatedRateData);

      expect(mockedAxios.put).toHaveBeenCalled();
      expect(response).toEqual({
        message: "Error updated rate details",
        data: null,
      });
    });
  });

  describe("deleteRate", () => {
    it("should delete a rate successfully", async () => {
      const rateId = "1";
      const mockResponse = { data: { id: rateId } };

      mockedAxios.delete.mockResolvedValue(mockResponse);

      const response = await deleteRate(rateId);

      expect(mockedAxios.delete).toHaveBeenCalledWith(
        `${BASE_URL}/rates/${rateId}`
      );
      expect(response).toEqual({
        message: "Rate deleted successfully",
        data: mockResponse.data,
      });
    });

    it("should handle error when deleting a rate", async () => {
      const rateId = "1";

      mockedAxios.delete.mockRejectedValue(new Error("Network Error"));

      const response = await deleteRate(rateId);

      expect(mockedAxios.delete).toHaveBeenCalledWith(
        `${BASE_URL}/rates/${rateId}`
      );
      expect(response).toEqual({
        message: "Error deleted rate details",
        data: null,
      });
    });
  });
});
