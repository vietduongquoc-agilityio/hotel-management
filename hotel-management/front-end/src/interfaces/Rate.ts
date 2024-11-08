export interface RateData {
  roomType: string;
  cancellationPolicy: string;
  deals: string;
  dealPrice: string;
  availability: string;
  documentId: string;
  rate: string;
  totalOfBooked?: number;
}

export type NewRateData = Omit<RateData, "documentId">;
