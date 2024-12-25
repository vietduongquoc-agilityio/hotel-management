import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  getDeals,
  createDealApi,
  updateDeal,
  deleteDeal,
} from "@/services";
import { NewDealData } from "@/interfaces";

jest.mock("@chakra-ui/react", () => ({
  createStandaloneToast: jest.fn(() => ({
    toast: jest.fn(),
  })),
}));

const mock = new MockAdapter(axios);
const BASE_URL = process.env.VITE_BASE_URL;

describe("dealService", () => {
  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

  describe("getDeals", () => {
    it("should fetch deals with pagination and match snapshot", async () => {
      const mockResponse = {
        data: [
          { id: "1", attributes: { dealName: "Deal 1", roomType: "Deluxe" } },
          { id: "2", attributes: { dealName: "Deal 2", roomType: "Standard" } },
        ],
        meta: { pagination: { page: 1, pageSize: 10, pageCount: 1, total: 2 } },
      };

      mock.onGet(`${BASE_URL}/deals`).reply(200, mockResponse);

      const result = await getDeals(1, 10);
      expect(result).toMatchSnapshot();
    });

    it("should return error message on failure", async () => {
      mock.onGet(`${BASE_URL}/deals`).reply(500);

      const result = await getDeals(1, 10);
      expect(result).toEqual({ message: "Error fetching deal data", data: null });
    });
  });

  describe("createDealApi", () => {
    it("should create a new deal and match snapshot", async () => {
      const dealData: NewDealData = {
        dealName: "Special Offer",
        referenceNumber: "12345",
        startDate: new Date(),
        endDate: new Date(),
        roomType: "Deluxe",
        statusDeal: "Active",
        reservationsLeft: 5,
      };
      const mockResponse = { data: { id: "1", attributes: { ...dealData } } };

      mock.onPost(`${BASE_URL}/deals`).reply(200, mockResponse);

      const result = await createDealApi(dealData);
      expect(result).toMatchSnapshot();
    });

    it("should return error message on failure", async () => {
      const dealData: NewDealData = {
        dealName: "Special Offer",
        referenceNumber: "12345",
        startDate: new Date(),
        endDate: new Date(),
        roomType: "Deluxe",
        statusDeal: "Active",
        reservationsLeft: 5,
      };

      mock.onPost(`${BASE_URL}/deals`).reply(500);

      const result = await createDealApi(dealData);
      expect(result).toEqual({ message: "Error updated deal details", data: null });
    });
  });

  describe("updateDeal", () => {
    it("should update a deal by ID and match snapshot", async () => {
      const dealId = "1";
      const dealData: NewDealData = {
        dealName: "Updated Deal",
        referenceNumber: "54321",
        startDate: new Date(),
        endDate: new Date(),
        roomType: "Suite",
        statusDeal: "Inactive",
        reservationsLeft: 3,
      };
      const mockResponse = {
        data: { id: dealId, attributes: { ...dealData } },
      };

      mock.onPut(`${BASE_URL}/deals/${dealId}`).reply(200, mockResponse);

      const result = await updateDeal(dealId, dealData);
      expect(result).toMatchSnapshot();
    });

    it("should throw error if dealId is missing", async () => {
      const dealData: NewDealData = {
        dealName: "Updated Deal",
        referenceNumber: "54321",
        startDate: new Date(),
        endDate: new Date(),
        roomType: "Suite",
        statusDeal: "Inactive",
        reservationsLeft: 3,
      };

      await expect(updateDeal("", dealData)).rejects.toThrow(
        "Missing document ID for deal update."
      );
    });

    it("should return error message on failure", async () => {
      const dealId = "1";
      const dealData: NewDealData = {
        dealName: "Updated Deal",
        referenceNumber: "54321",
        startDate: new Date(),
        endDate: new Date(),
        roomType: "Suite",
        statusDeal: "Inactive",
        reservationsLeft: 3,
      };

      mock.onPut(`${BASE_URL}/deals/${dealId}`).reply(500);

      const result = await updateDeal(dealId, dealData);
      expect(result).toEqual({ message: "Error updated deal details", data: null });
    });
  });

  describe("deleteDeal", () => {
    it("should delete a deal by ID and match snapshot", async () => {
      const dealId = "1";
      const mockResponse = { message: "Deal deleted successfully" };

      mock.onDelete(`${BASE_URL}/deals/${dealId}`).reply(200, mockResponse);

      const result = await deleteDeal(dealId);
      expect(result).toMatchSnapshot();
    });

    it("should return error message on failure", async () => {
      const dealId = "1";
      mock.onDelete(`${BASE_URL}/deals/${dealId}`).reply(500);

      const result = await deleteDeal(dealId);
      expect(result).toEqual({ message: "Error deleted deal details", data: null });
    });
  });
});
