import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getRates, createRateApi, updateRate, deleteRate } from "@/services";
import { NewRateData } from "@/interfaces";

jest.mock("@chakra-ui/react", () => ({
  createStandaloneToast: jest.fn(() => ({
    toast: jest.fn(),
  })),
}));

const mock = new MockAdapter(axios);
const BASE_URL = process.env.VITE_BASE_URL;

describe("rateService", () => {
  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

  describe("getRates", () => {
    it("should fetch rates with pagination and match snapshot", async () => {
      const mockResponse = {
        data: [
          { id: "1", attributes: { name: "Rate 1", price: 100 } },
          { id: "2", attributes: { name: "Rate 2", price: 150 } },
        ],
        meta: { pagination: { page: 1, pageSize: 10, pageCount: 1, total: 2 } },
      };

      mock.onGet(`${BASE_URL}/rates`).reply(200, mockResponse);

      const result = await getRates(1, 10);
      expect(result).toMatchSnapshot();
    });
  });

  describe("createRateApi", () => {
    it("should create a new rate and match snapshot", async () => {
      const rateData: NewRateData = {
        roomType: "Deluxe",
        cancellationPolicy: "Flexible",
        deals: "None",
        dealPrice: "0",
        rate: "200",
        availability: "5",
        totalOfRooms: 0,
        totalOfBooked: 0,
      };
      const mockResponse = { data: { id: "1", attributes: { ...rateData } } };

      mock.onPost(`${BASE_URL}/rates`).reply(200, mockResponse);
    });

    it("should show error toast on failure", async () => {
      const rateData: NewRateData = {
        roomType: "Deluxe",
        cancellationPolicy: "Flexible",
        deals: "None",
        dealPrice: "0",
        rate: "200",
        availability: "5",
        totalOfRooms: 0,
        totalOfBooked: 0,
      };
      mock.onPost(`${BASE_URL}/rates`).reply(500);

      await expect(createRateApi(rateData)).rejects.toThrow(
        "Request failed with status code 500"
      );
    });
  });

  describe("updateRate", () => {
    it("should update a rate by ID and match snapshot", async () => {
      const rateId = "1";
      const rateData: NewRateData = {
        roomType: "Updated Deluxe",
        cancellationPolicy: "Moderate",
        deals: "Spring Discount",
        dealPrice: "20",
        rate: "180",
        availability: "3",
        totalOfRooms: 0,
        totalOfBooked: 0,
      };
      const mockResponse = {
        data: { id: rateId, attributes: { ...rateData } },
      };

      mock.onPut(`${BASE_URL}/rates/${rateId}`).reply(200, mockResponse);
    });

    it("should throw error if rateId is missing", async () => {
      const rateData: NewRateData = {
        roomType: "Updated Deluxe",
        cancellationPolicy: "Moderate",
        deals: "Spring Discount",
        dealPrice: "20",
        rate: "180",
        availability: "3",
        totalOfRooms: 0,
        totalOfBooked: 0,
      };

      await expect(updateRate("", rateData)).rejects.toThrow(
        "Missing document ID for rate update."
      );
    });

    it("should show error toast on update failure", async () => {
      const rateId = "1";
      const rateData: NewRateData = {
        roomType: "Updated Deluxe",
        cancellationPolicy: "Moderate",
        deals: "Spring Discount",
        dealPrice: "20",
        rate: "180",
        availability: "3",
        totalOfRooms: 0,
        totalOfBooked: 0,
      };

      mock.onPut(`${BASE_URL}/rates/${rateId}`).reply(500);

      await expect(updateRate(rateId, rateData)).rejects.toThrow(
        "Request failed with status code 500"
      );
    });
  });

  describe("deleteRate", () => {
    it("should delete a rate by ID and match snapshot", async () => {
      const rateId = "1";
      const mockResponse = { message: "Rate deleted successfully" };

      mock.onDelete(`${BASE_URL}/rates/${rateId}`).reply(200, mockResponse);

      const result = await deleteRate(rateId);
      expect(result).toMatchSnapshot();
    });

    it("should show error toast on delete failure", async () => {
      const rateId = "1";
      mock.onDelete(`${BASE_URL}/rates/${rateId}`).reply(404);

      await expect(deleteRate(rateId)).rejects.toThrow(
        "Request failed with status code 404"
      );
    });
  });
});
