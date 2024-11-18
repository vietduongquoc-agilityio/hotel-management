import { Meta, StoryFn } from "@storybook/react";
import TableRoom, { TableRoomProps } from "./index";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { themeColor } from "@/themes/Base/colors";
import { mockRooms } from "@/mocks/room";

export default {
  title: "Components/Tables/TableRoom",
  component: TableRoom,
  decorators: [
    (Story) => <ChakraProvider theme={themeColor}>{Story()}</ChakraProvider>,
  ],
} as Meta;

const Template: StoryFn<TableRoomProps> = (args) => (
  <Box p={4} maxW="1020px">
    <TableRoom {...args} />
  </Box>
);

// Default Story
export const Default = Template.bind({});
Default.args = {
  rooms: mockRooms,
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
