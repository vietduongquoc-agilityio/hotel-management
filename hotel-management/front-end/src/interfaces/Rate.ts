export interface RateData {
  totalOfRooms: number;
  roomType: string;
  cancellationPolicy: string;
  deals: string;
  dealPrice: string;
  availability: number;
  documentId: string;
  rate: string;
  totalOfBooked?: number;
}

export type NewRateData = Omit<RateData, "documentId">;
