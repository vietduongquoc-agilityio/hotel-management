export interface GuestData {
    guestName: string;
    roomType: string;
    stay: number;
    price: number;
    registrationNumber: string;
    totalAmount: number;
    checkInDate: Date;
    documentId: string;
}

export type NewGuestData = Omit<GuestData, "documentId">;
