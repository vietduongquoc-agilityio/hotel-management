// Constant
import { roomStatusBackgrounds, roomStatusColors } from "@/constant";

// Interfaces
import { RoomData, RateData } from "@/interfaces";

export const renderRoomBody = (room: RoomData) => {
  const { roomNumber, bedType, roomFloor, roomFacility, roomStatus } = room;
  return [
    {
      value: roomNumber,
      width: "15%",
      color: "grey.900",
      fontWeight: "500",
    },
    {
      value: bedType + " Bed",
      width: "20%",
    },
    {
      value: roomFloor + " Floor",
      width: "15%",
    },
    {
      value: roomFacility,
      width: "27%",
    },
    {
      value: roomStatus,
      width: "65px",
      borderRadius: "16px",
      p: "4px 8px",
      m: "auto",
      bg: roomStatusBackgrounds[roomStatus],
      display: "flex",
      justifyContent: "center",
      color: roomStatusColors[roomStatus],
      fontSize: "12px",
    },
  ];
};

export const renderRateBody = (rate: RateData) => {
  const {
    roomType,
    deals,
    cancellationPolicy,
    dealPrice,
    totalOfRooms,
    totalOfBooked,
  } = rate;

  const availability = totalOfRooms - totalOfBooked;
  const isFull = availability === 0;
  const textColor = isFull ? "red.500" : "blue.500";
  const backgroundColor = isFull ? "red.100" : "blue.100";

  return [
    {
      value: roomType,
      width: "15%",
      color: "grey.900",
    },
    {
      value: deals,
      width: "15%",
    },
    {
      value: cancellationPolicy,
      width: "15%",
    },
    {
      value: dealPrice,
      width: "15%",
    },
    {
      value: dealPrice,
      width: "15%",
      color: "grey.900",
      fontWeight: "500",
    },
    {
      value: isFull ? "Full" : availability,
      width: "65px",
      color: textColor,
      bg: backgroundColor,
      display: "flex",
      justifyContent: "center",
      p: "2px 4px",
      borderRadius: "16px",
      fontSize: "",
      m: "",
    },
  ];
};

export const tableHeaders = (type: string) => {
  return type === "room"
    ? [
        { label: "Room number", width: "15%" },
        { label: "Bed type", width: "20%" },
        { label: "Room floor", width: "15%" },
        { label: "Room facility", width: "32%" },
        { label: "Status", width: "16%", ml: "12px" },
      ]
    : [
        { label: "Room type", width: "15%" },
        { label: "Deals", width: "15%" },
        { label: "Cancellation policy", width: "15%" },
        { label: "Deal price", width: "15%" },
        { label: "Rate", width: "15%" },
        { label: "Availability", width: "26%" },
      ];
};
