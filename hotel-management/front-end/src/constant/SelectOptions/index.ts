// src/constants/selectOptions.ts

export const bedTypeOptions = [
  { value: "Single", label: "Single Bed" },
  { value: "Double", label: "Double Bed" },
  { value: "Queen", label: "Queen Bed" },
  { value: "King", label: "King Bed" },
];

export const roomFloorOptions = [
  { value: "2nd", label: "2nd Floor" },
  { value: "3rd", label: "3rd Floor" },
  { value: "4th", label: "4th Floor" },
  { value: "5th", label: "5th Floor" },
];

export const roomStatusOptions = [
  { value: "Available", label: "Available" },
  { value: "Booked", label: "Booked" },
  { value: "Reserved", label: "Reserved" },
  { value: "WaitList", label: "WaitList" },
  { value: "Blocked", label: "Blocked" },
];

// roomStatusColors.ts (or add to your constants file)
export const roomStatusColors: { [key: string]: string } = {
  Available: "blue.400",
  Booked: "error.400",
  Reserved: "success.400",
  Waitlist: "warning.400",
  Blocked: "warning.400",
};

export const roomStatusBackgrounds: { [key: string]: string } = {
  Available: "blue.100",
  Booked: "error.50",
  Reserved: "success.50",
  Waitlist: "warning.50",
  Blocked: "warning.50",
};
