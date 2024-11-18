import { RoomData } from "@/interfaces/Room";

export const mockRooms: RoomData[] = [
  {
    documentId: "1",
    roomNumber: "101",
    bedType: "Queen",
    roomFloor: "1",
    roomFacility: "TV, Air Conditioning",
    roomStatus: "Available",
  },
  {
    documentId: "2",
    roomNumber: "102",
    bedType: "King",
    roomFloor: "2",
    roomFacility: "WiFi, Mini Bar",
    roomStatus: "Booked",
  },
  {
    documentId: "3",
    roomNumber: "103",
    bedType: "Twin",
    roomFloor: "3",
    roomFacility: "Desk, Coffee Maker",
    roomStatus: "Reserved",
  },
];
