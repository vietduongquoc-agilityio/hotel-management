export interface RateData {
  roomType: string;
  cancellationPolicy: string;
  deals: string;
  dealPrice: string;
  availability: any;
  documentId: string;
  rate: string;
  totalOfBooked?: any;
}

export type NewRateData = Omit<RateData, "documentId">;
