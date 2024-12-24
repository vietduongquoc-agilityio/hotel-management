import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom";
import { themeColor } from "@/themes/Base/colors";

// Components
import Table, { TableProps } from ".";

// InterFace
import { RoomData, RateData, GuestData, DealData } from "@/interfaces";

// Mock Data
const roomData: RoomData[] = [
  {
    documentId: "1",
    roomNumber: "101",
    bedType: "Queen",
    roomFloor: "1",
    roomFacility: "TV, WiFi, Air Conditioner",
    roomStatus: "Available",
  },
  {
    documentId: "2",
    roomNumber: "102",
    bedType: "King",
    roomFloor: "2",
    roomFacility: "TV, WiFi",
    roomStatus: "Booked",
  },
];

const rateData: RateData[] = [
  {
    documentId: "1",
    roomType: "Deluxe",
    deals: "Family Deal",
    cancellationPolicy: "Flexible",
    dealPrice: "120",
    rate: "150",
    totalOfRooms: 10,
    totalOfBooked: 5,
  },
  {
    documentId: "2",
    roomType: "Standard",
    deals: "No Deals",
    cancellationPolicy: "Non-refundable",
    dealPrice: "80",
    rate: "100",
    totalOfRooms: 5,
    totalOfBooked: 5,
  },
];

const guestData: GuestData[] = [
  {
    roomType: "King",
    guestName: "Alex",
    stay: 2,
    price: 1000,
    registrationNumber: "#2222",
    totalAmount: 2000,
    checkInDate: new Date("2024-12-01"),
    documentId: "1",
  },
  {
    roomType: "Queen",
    guestName: "Anna",
    stay: 4,
    price: 1000,
    registrationNumber: "#1111",
    totalAmount: 4000,
    checkInDate: new Date("2024-12-05"),
    documentId: "2",
  },
];

const dealData: DealData[] = [
  {
    dealName: "Alex",
    referenceNumber: "1111",
    startDate: new Date("2024-12-24"),
    endDate: new Date("2024-12-26"),
    roomType: "King",
    statusDeal: "Full",
    reservationsLeft: 2,
    documentId: "1"
  },
  {
    dealName: "Anna",
    referenceNumber: "2222",
    startDate: new Date("2024-12-27"),
    endDate: new Date("2024-12-29"),
    roomType: "Queen",
    statusDeal: "Ongoing",
    reservationsLeft: 2,
    documentId: "2"
  },
];

// Handlers
const handleDelete = (id: string) => alert(`Deleted item with ID: ${id}`);
const handleEdit = (updatedData: RoomData | RateData | GuestData | DealData) =>
  alert(`Edited item: ${JSON.stringify(updatedData, null, 2)}`);

// Meta
export default {
  title: "Components/Table",
  component: Table,
  argTypes: {
    type: {
      control: { type: "select", options: ["room", "rate", "deal", "guest"] },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ChakraProvider theme={themeColor}>
        <MemoryRouter>{Story()}</MemoryRouter>
      </ChakraProvider>
    ),
  ],
} as Meta;

// Template
const Template: StoryFn<TableProps<RoomData | RateData | GuestData | DealData>> = (
  args
) => <Table {...args} />;

// Stories
export const RoomTable = Template.bind({});
RoomTable.args = {
  data: roomData,
  type: "room",
  onDelete: handleDelete,
  onEdit: handleEdit,
};

export const RateTable = Template.bind({});
RateTable.args = {
  data: rateData,
  type: "rate",
  onDelete: handleDelete,
  onEdit: handleEdit,
};

export const EmptyRoomTable = Template.bind({});
EmptyRoomTable.args = {
  data: [],
  type: "room",
  onDelete: handleDelete,
  onEdit: handleEdit,
};

export const EmptyRateTable = Template.bind({});
EmptyRateTable.args = {
  data: [],
  type: "rate",
  onDelete: handleDelete,
  onEdit: handleEdit,
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  data: [],
  type: "room",
  error: "Failed to fetch data. Please try again later.",
  onDelete: handleDelete,
  onEdit: handleEdit,
};

export const GuestTable = Template.bind({});
GuestTable.args = {
  data: guestData,
  type: "guest",
  onDelete: handleDelete,
  onEdit: handleEdit,
};

export const EmptyGuestTable = Template.bind({});
EmptyGuestTable.args = {
  data: [],
  type: "guest",
  onDelete: handleDelete,
  onEdit: handleEdit,
};

export const DealTable = Template.bind({});
DealTable.args = {
  data: dealData,
  type: "deal",
  onDelete: handleDelete,
  onEdit: handleEdit,
};

export const EmptyDealTable = Template.bind({});
EmptyDealTable.args = {
  data: [],
  type: "deal",
  onDelete: handleDelete,
  onEdit: handleEdit,
};
