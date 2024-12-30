import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  getRooms,
  createRoomApi,
  getRoomById,
  updateRoom,
  deleteRoom,
} from "@/services";
import { NewRoomData } from "@/interfaces";

const mock = new MockAdapter(axios);
const BASE_URL = process.env.VITE_BASE_URL;

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("roomService", () => {
  afterEach(() => {
    mock.reset();
  });

  describe("getRooms", () => {
    it("should fetch rooms with pagination data", async () => {
      const mockResponse = {
        data: [
          { id: "1", attributes: { name: "Room 1" } },
          { id: "2", attributes: { name: "Room 2" } },
        ],
        meta: { pagination: { page: 1, pageSize: 10, pageCount: 1, total: 2 } },
      };

      mock.onGet(`${BASE_URL}/rooms`).reply(200, mockResponse);

      const result = await getRooms(1, 10);
      expect(result).toMatchSnapshot();
    });

    it("should show error toast on failure", async () => {
      mock.onGet(`${BASE_URL}/rooms`).reply(500);

      await expect(getRooms(1, 10)).rejects.toThrow(
        "Request failed with status code 500"
      );
    });

    it("should handle filters correctly", async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          data: [{ id: 1, name: "Room 1" }],
          meta: { pagination: { page: 1, pageSize: 10 } },
        },
      });

      const filters = { type: "deluxe", status: "available" };
      const response = await getRooms(1, 10, filters);

      expect(mockedAxios.get).toHaveBeenCalledWith(expect.any(String), {
        params: {
          "filters[type]": "deluxe",
          "filters[status]": "available",
          "sort[0]": "createdAt:desc",
          "pagination[page]": 1,
          "pagination[pageSize]": 10,
        },
      });
      expect(response.rooms).toEqual([{ id: 1, name: "Room 1" }]);
    });

    it("should handle empty filters", async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          data: [{ id: 1, name: "Room 1" }],
          meta: { pagination: { page: 1, pageSize: 10 } },
        },
      });

      const filters = {};
      const response = await getRooms(1, 10, filters);

      expect(mockedAxios.get).toHaveBeenCalledWith(expect.any(String), {
        params: {
          "sort[0]": "createdAt:desc",
          "pagination[page]": 1,
          "pagination[pageSize]": 10,
        },
      });
      expect(response.rooms).toEqual([{ id: 1, name: "Room 1" }]);
    });

    it("should return response.data when pagination is missing", async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          data: [{ id: 1, name: "Room 1" }],
        },
      });

      const filters = {};
      const response = await getRooms(1, 10, filters);

      expect(response).toEqual({ data: [{ id: 1, name: "Room 1" }] });
    });
  });

  describe("createRoomApi", () => {
    it("should create a new room", async () => {
      const roomData: NewRoomData = {
        bedType: "Room 1",
        roomStatus: "Available",
        roomFacility: "",
        roomFloor: "",
        roomNumber: "",
      };
      const mockResponse = { data: { id: "1", attributes: { ...roomData } } };

      mock.onPost(`${BASE_URL}/rooms`).reply(200, mockResponse);

      const result = await createRoomApi(roomData);
      expect(result).toEqual(mockResponse);
    });

    it("should show error toast on failure", async () => {
      const roomData: NewRoomData = {
        bedType: "Room 1",
        roomStatus: "Available",
        roomFacility: "",
        roomFloor: "",
        roomNumber: "",
      };
      mock.onPost(`${BASE_URL}/rooms`).reply(500);

      await expect(createRoomApi(roomData)).rejects.toThrow(
        "Request failed with status code 500"
      );
    });
  });

  describe("getRoomById", () => {

    it("should return room details successfully", async () => {
      const roomId = "123";
      const mockRoomData = { id: roomId, name: "Room 1" };

      mockedAxios.get.mockResolvedValue({ data: mockRoomData });

      const response = await getRoomById(roomId);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${BASE_URL}/rooms/${roomId}`
      );
      expect(response).toEqual({
        message: "Room fetched successfully",
        data: mockRoomData,
      });
    });

    it("should handle error when fetching room details", async () => {
      const roomId = "123";

      mockedAxios.get.mockRejectedValue(new Error("Network Error"));

      const response = await getRoomById(roomId);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${BASE_URL}/rooms/${roomId}`
      );
      expect(response).toEqual({
        message: "Error fetching room details",
        data: null,
      });
    });
  });

  describe("updateRoom", () => {
    it("should update a room by ID", async () => {
      const roomId = "1";
      const roomData: NewRoomData = {
        bedType: "Updated Room",
        roomStatus: "Booked",
        roomFacility: "",
        roomFloor: "",
        roomNumber: "",
      };
      const mockResponse = {
        data: { id: roomId, attributes: { ...roomData } },
      };

      mock.onPut(`${BASE_URL}/rooms/${roomId}`).reply(200, mockResponse);

      const result = await updateRoom(roomId, roomData);
      expect(result).toEqual(mockResponse);
    });
    it("should update room successfully", async () => {
      const roomId = "123";
      const roomData = { name: "Updated Room", status: "Available" };

      mockedAxios.put.mockResolvedValue({
        data: { id: roomId, ...roomData },
      });

      const response = await updateRoom(roomId, roomData);

      expect(mockedAxios.put).toHaveBeenCalledWith(
        `${BASE_URL}/rooms/${roomId}`,
        {
          data: roomData,
        }
      );
      expect(response).toEqual({
        message: "Room updated successfully",
        data: { id: roomId, ...roomData },
      });
    });

    it("should throw an error for missing roomId", async () => {
      const roomData = { name: "Updated Room", status: "Available" };

      const response = await updateRoom("", roomData);

      expect(response).toEqual({
        message: "Error updated room details",
        data: null,
      });
    });
  });

  describe("deleteRoom", () => {
    it("should delete a room by ID", async () => {
      const roomId = "1";
      const mockResponse = { message: "Room deleted successfully" };

      mock.onDelete(`${BASE_URL}/rooms/${roomId}`).reply(200, mockResponse);

      const result = await deleteRoom(roomId);
      expect(result).toEqual(mockResponse);
    });

    it("should throw error for invalid room ID", async () => {
      const roomId = "1";
      mock.onDelete(`${BASE_URL}/rooms/${roomId}`).reply(404);

      await expect(deleteRoom(roomId)).rejects.toThrow(
        "Request failed with status code 404"
      );
    });
  });
});
