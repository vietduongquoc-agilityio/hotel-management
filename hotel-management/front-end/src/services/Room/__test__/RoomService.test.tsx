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
    it("should fetch room by ID", async () => {
      const roomId = "1";
      const mockResponse = {
        data: { id: roomId, attributes: { name: "Room 1" } },
      };

      mock.onGet(`${BASE_URL}/rooms/${roomId}`).reply(200, mockResponse);

      const result = await getRoomById(roomId);
      expect(result).toEqual(mockResponse);
    });

    it("should throw error for invalid room ID", async () => {
      const roomId = "1";
      mock.onGet(`${BASE_URL}/rooms/${roomId}`).reply(404);

      await expect(getRoomById(roomId)).rejects.toThrow(
        "Request failed with status code 404"
      );
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
