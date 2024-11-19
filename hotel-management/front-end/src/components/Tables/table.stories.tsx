import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom";
import { themeColor } from "@/themes/Base/colors";

// Components
import Table, { TableProps } from "./";

// InterFace
import { RoomData } from "@/interfaces/Room";
import { RateData } from "@/interfaces/Rate";


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
    deals: "Breakfast Included",
    cancellationPolicy: "Free Cancellation",
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

// Handlers
const handleDelete = (id: string) => alert(`Deleted item with ID: ${id}`);
const handleEdit = (updatedData: RoomData | RateData) =>
  alert(`Edited item: ${JSON.stringify(updatedData, null, 2)}`);

// Meta
export default {
  title: "Components/Table",
  component: Table,
  argTypes: {
    type: {
      control: { type: "select", options: ["room", "rate"] },
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
const Template: StoryFn<TableProps<RoomData | RateData>> = (args) => (
  <Table {...args} />
);

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
