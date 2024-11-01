export interface RoomData {
  bedType: string;
  roomFacility: string;
  roomFloor: string;
  roomStatus: string;
  roomNumber: string;
  documentId: string;
}

export type NewRoomData = Omit<RoomData, "documentId">;
