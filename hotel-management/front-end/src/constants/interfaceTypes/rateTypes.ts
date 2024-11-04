export interface RateData {
  roomType: string;
  cancellationPolicy: string;
  deals: string;
  dealPrice: string;
  availability: string;
  documentId: string;
}

export type NewRateData = Omit<RateData, "documentId">;