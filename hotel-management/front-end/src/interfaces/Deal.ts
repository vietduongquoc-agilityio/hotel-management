export interface DealData {
  dealName: string;
  referenceNumber: string;
  startDate: Date;
  endDate: Date;
  roomType: string;
  statusDeal: string;
  reservationsLeft: number;
  documentId: string;
}

export type NewDealData = Omit<DealData, "documentId">;
