import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getGuests, createGuestApi, updateGuest, deleteGuest } from "@/services";
import { NewGuestData } from "@/interfaces";

jest.mock("@chakra-ui/react", () => ({
  createStandaloneToast: jest.fn(() => ({
    toast: jest.fn(),
  })),
}));

const mock = new MockAdapter(axios);
const BASE_URL = process.env.VITE_BASE_URL;

const mockToast = require("@chakra-ui/react").createStandaloneToast();
const { toast } = mockToast;

describe("guestService", () => {
  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

  describe("getGuests", () => {
    it("should fetch guests with pagination and filters and match snapshot", async () => {
      const mockResponse = {
        data: [
          { id: "1", attributes: { guestName: "John Doe", stay: 3 } },
          { id: "2", attributes: { guestName: "Jane Smith", stay: 2 } },
        ],
        meta: { pagination: { page: 1, pageSize: 10, pageCount: 1, total: 2 } },
      };

      const filters = { roomType: "Deluxe" };
      mock.onGet(`${BASE_URL}/guests`).reply(200, mockResponse);

      const result = await getGuests(1, 10, filters);
      expect(result).toMatchSnapshot();
    });

    it("should handle error when fetching guests", async () => {
      mock.onGet(`${BASE_URL}/guests`).reply(500);

      const result = await getGuests(1, 10);
      expect(result).toEqual({ message: "Error fetching guest data", data: null });
    });
  });

  describe("createGuestApi", () => {
    it("should create a new guest and match snapshot", async () => {
      const guestData: NewGuestData = {
        guestName: "John Doe",
        roomType: "Deluxe",
        stay: 3,
        price: 200,
        registrationNumber: "REG123",
        totalAmount: 600,
        checkInDate: new Date("2024-12-25"),
      };

      const mockResponse = { data: { id: "1", attributes: { ...guestData } } };
      mock.onPost(`${BASE_URL}/guests`).reply(200, mockResponse);

      const result = await createGuestApi(guestData);
      expect(result).toMatchSnapshot();
    });

    it("should handle error when creating a guest", async () => {
      const guestData: NewGuestData = {
        guestName: "John Doe",
        roomType: "Deluxe",
        stay: 3,
        price: 200,
        registrationNumber: "REG123",
        totalAmount: 600,
        checkInDate: new Date("2024-12-25"),
      };

      mock.onPost(`${BASE_URL}/guests`).reply(500);

      const result = await createGuestApi(guestData);
      expect(result).toEqual({ message: "Error updated guest details", data: null });
    });
  });

  describe("updateGuest", () => {
    it("should update a guest by ID and match snapshot", async () => {
      const guestId = "1";
      const guestData: NewGuestData = {
        guestName: "Jane Smith",
        roomType: "Suite",
        stay: 5,
        price: 300,
        registrationNumber: "REG456",
        totalAmount: 1500,
        checkInDate: new Date("2024-12-20"),
      };

      const mockResponse = { data: { id: guestId, attributes: { ...guestData } } };
      mock.onPut(`${BASE_URL}/guests/${guestId}`).reply(200, mockResponse);

      const result = await updateGuest(guestId, guestData);
      expect(result).toMatchSnapshot();
    });

    it("should throw error if guestId is missing", async () => {
      const guestData: NewGuestData = {
        guestName: "Jane Smith",
        roomType: "Suite",
        stay: 5,
        price: 300,
        registrationNumber: "REG456",
        totalAmount: 1500,
        checkInDate: new Date("2024-12-20"),
      };

      await expect(updateGuest("", guestData)).rejects.toThrow(
        "Missing document ID for guest update."
      );
      expect(toast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Error",
          description: "Missing document ID for guest update.",
        })
      );
    });

    it("should handle error when updating a guest", async () => {
      const guestId = "1";
      const guestData: NewGuestData = {
        guestName: "Jane Smith",
        roomType: "Suite",
        stay: 5,
        price: 300,
        registrationNumber: "REG456",
        totalAmount: 1500,
        checkInDate: new Date("2024-12-20"),
      };

      mock.onPut(`${BASE_URL}/guests/${guestId}`).reply(500);

      const result = await updateGuest(guestId, guestData);
      expect(result).toEqual({ message: "Error updated guest details", data: null });
    });
  });

  describe("deleteGuest", () => {
    it("should delete a guest by ID and match snapshot", async () => {
      const guestId = "1";
      const mockResponse = { message: "Guest deleted successfully" };

      mock.onDelete(`${BASE_URL}/guests/${guestId}`).reply(200, mockResponse);

      const result = await deleteGuest(guestId);
      expect(result).toMatchSnapshot();
    });

    it("should handle error when deleting a guest", async () => {
      const guestId = "1";

      mock.onDelete(`${BASE_URL}/guests/${guestId}`).reply(500);

      const result = await deleteGuest(guestId);
      expect(result).toEqual({ message: "Error deleted guest details", data: null });
    });
  });
});
