// Constant
import { roomStatusBackgrounds, roomStatusColors } from "@/constants";

// Interfaces
import { RoomData, RateData, GuestData, DealData } from "@/interfaces";

// Interfaces for row properties
interface TableCell {
  value: string | number | Date | undefined;
  width: string;
  color?: string;
  fontWeight?: string;
  display?: string;
  justifyContent?: string;
  p?: string;
  borderRadius?: string;
  fontSize?: string;
  m?: string;
  bg?: string;
}

export const renderRoomBody = (room: RoomData): TableCell[] => {
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

export const renderRateBody = (rate: RateData): TableCell[] => {
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
      value: `$${dealPrice}`,
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

export const renderGuestBody = (guest: GuestData): TableCell[] => {
  const { guestName, roomType, stay, price, registrationNumber, totalAmount } =
    guest;

  return [
    {
      value: `#${guestName}`,
      width: "15%",
      color: "grey.900",
    },
    {
      value: roomType,
      width: "15%",
    },
    {
      value: stay,
      width: "16%",
    },
    {
      value: `${price} nights`,
      width: "15%",
    },
    {
      value: registrationNumber,
      width: "15%",
      color: "grey.900",
      fontWeight: "500",
    },
    {
      value: `$${totalAmount}`,
      width: "65px",
      display: "flex",
      p: "2px 4px",
      borderRadius: "16px",
      fontSize: "",
      m: "",
    },
  ];
};

export const renderDealBody = (deal: DealData): TableCell[] => {
  const {
    dealName,
    referenceNumber,
    endDate,
    roomType,
    statusDeal,
    reservationsLeft,
  } = deal;

  return [
    {
      value: `#${referenceNumber}`,
      width: "15%",
      color: "grey.900",
    },
    {
      value: dealName,
      width: "15%",
    },
    {
      value: reservationsLeft,
      width: "16%",
    },
    {
      value: endDate,
      width: "15%",
    },
    {
      value: roomType,
      width: "15%",
      color: "grey.900",
      fontWeight: "500",
    },
    {
      value: statusDeal,
      width: "65px",
      display: "flex",
      p: "2px 4px",
      borderRadius: "16px",
      fontSize: "",
      m: "",
    },
  ];
};

export const tableHeaders = (type: string) => {
  if (type === "room") {
    return [
      { label: "Room number", width: "15%" },
      { label: "Bed type", width: "20%" },
      { label: "Room floor", width: "15%" },
      { label: "Room facility", width: "32%" },
      { label: "Status", width: "16%", ml: "12px" },
    ];
  } else if (type === "rate") {
    [
      { label: "Room type", width: "15%" },
      { label: "Deals", width: "15%" },
      { label: "Cancellation policy", width: "15%" },
      { label: "Deal price", width: "15%" },
      { label: "Rate", width: "15%" },
      { label: "Availability", width: "26%" },
    ];
  } else if (type === "guest") {
    return [
      { label: "Reservation ID", width: "15%" },
      { label: "Guest Name", width: "15%" },
      { label: "Room Type", width: "15%" },
      { label: "Stay Duration", width: "15%" },
      { label: "Price per Night", width: "15%" },
      { label: "Total Amount", width: "26%" },
    ];
  } else if (type === "deal") {
    return [
      { label: "Reservation number", width: "15%" },
      { label: "Deal Name", width: "15%" },
      { label: "Reservations Left", width: "15%" },
      { label: "End Date", width: "15%" },
      { label: "Room Type", width: "15%" },
      { label: "Status", width: "26%" },
    ];
  }
  return [];
};
