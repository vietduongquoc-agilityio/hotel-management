import { RateData } from "@/interfaces";

// Mock Data
export const mockRates: RateData[] = [
  {
    documentId: "1",
    roomType: "King",
    cancellationPolicy: "Flexible",
    dealPrice: "1000",
    deals: "10% off",
    rate: "1000$",
    totalOfRooms: 10,
    totalOfBooked: 5,
  },
  {
    documentId: "2",
    roomType: "Standard",
    cancellationPolicy: "Non-refundable",
    dealPrice: "100",
    deals: "5% off",
    rate: "95",
    totalOfRooms: 20,
    totalOfBooked: 20,
  },
];
