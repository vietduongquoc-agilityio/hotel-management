import { Meta, StoryFn } from "@storybook/react";
import TableRoom, { TableRoomProps } from "./index";
import { RoomData } from "@/interfaces/Room";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { themeColor } from "@/themes/Base/colors";

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

export default {
  title: "Components/Tables/TableRoom",
  component: TableRoom,
  decorators: [
    (Story) => <ChakraProvider theme={themeColor}>{Story()}</ChakraProvider>,
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
