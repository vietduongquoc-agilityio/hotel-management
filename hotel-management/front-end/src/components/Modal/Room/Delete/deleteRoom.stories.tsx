import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import DeleteRoom from ".";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { themeColor } from "@/themes/Base/colors";

// Mock Services
const mockDeleteRoomService = async (roomId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(roomId);
    }, 1000);
  });
};

// Mock Props
const Template: StoryFn = (args) => {
  const [room, setRoom] = useState(["room1", "room2", "room3"]);

  const handleDeleteRoom = (roomId: string) => {
    setRoom(room.filter((room) => room !== roomId));
  };

  return (
    <ChakraProvider theme={themeColor}>
      <Box m={4}>
        <h2>room</h2>
        {room.map((roomId) => (
          <Box key={roomId} mb={4}>
            <DeleteRoom
              roomId={roomId}
              onDeleteRoom={handleDeleteRoom}
              {...args}
            />
          </Box>
        ))}
      </Box>
    </ChakraProvider>
  );
};

export default {
  title: "Components/Modals/Room/DeleteRoom",
  component: DeleteRoom,
  argTypes: {},
  tags: ["autodocs"],
} as Meta;

// Default Story
export const Default = Template.bind({});
Default.args = {
  // Mock function to simulate API behavior
  deleteRate: mockDeleteRoomService,
};
