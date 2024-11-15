import { Meta, StoryFn } from "@storybook/react";
import TableRoom, { TableRoomProps } from "./index";
import { RoomData } from "@/interfaces/Room";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";

// Sample room data
const sampleRooms: RoomData[] = [
  {
    documentId: "1",
    roomNumber: "101",
    bedType: "Queen",
    roomFloor: "1",
    roomFacility: "TV, Air Conditioning",
    roomStatus: "Available",
  },
  {
    documentId: "2",
    roomNumber: "102",
    bedType: "King",
    roomFloor: "2",
    roomFacility: "WiFi, Mini Bar",
    roomStatus: "Booked",
  },
  {
    documentId: "3",
    roomNumber: "103",
    bedType: "Twin",
    roomFloor: "3",
    roomFacility: "Desk, Coffee Maker",
    roomStatus: "Reserved",
  },
];

const theme = extendTheme({
  colors: {
    blue: {
      100: "#d4e5fa",
      400: "#589af7",
      500: "#1570ef",
      600: "#1366d9",
      800: "#0c3e83",
    },
    grey: {
      50: "#f0f1f3",
      100: "#f0d3d9",
      300: "#989fad",
      500: "#667085",
      400: "#858d9d",
      600: "#5d6679",
      700: "#48505e",
      800: "#383e49",
      900: "#2b2f38",
    },
    success: {
      50: "#e7f8f0",
      400: "#41c588",
    },
    error: {
      50: "#feeceb",
      400: "#f36960",
    },
    warning: {
      50: "#fef4e6",
      400: "#f9a63a",
    },
    white: {
      200: "#ffffff",
    },
  },
});

export default {
  title: "Components/Tables/TableRoom",
  component: TableRoom,
  decorators: [
    (Story) => <ChakraProvider theme={theme}>{Story()}</ChakraProvider>,
  ],
} as Meta;

// Template
const Template: StoryFn<TableRoomProps> = (args) => (
  <Box p={4} maxW="1020px">
    <TableRoom {...args} />
  </Box>
);

// Default Story
export const Default = Template.bind({});
Default.args = {
  rooms: sampleRooms,
  onDeleteRoom: (roomId) => {
    alert(`Room with ID ${roomId} deleted`);
  },
  onEditRoom: (roomData) => {
    alert(`Room with number ${roomData.roomNumber} edited`);
  },
};

// Story with Error
export const WithError = Template.bind({});
WithError.args = {
  rooms: [],
  error: "Failed to load room data.",
  onDeleteRoom: () => {},
  onEditRoom: () => {},
};
