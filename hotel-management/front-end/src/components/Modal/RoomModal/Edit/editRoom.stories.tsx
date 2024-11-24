import { themeColor } from "@/themes/Base/colors";
import { ChakraProvider } from "@chakra-ui/react";
import { Meta, StoryFn } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

// Components
import EditRoomModal from "./";

// InterFace
import { RoomData } from "@/interfaces";

export default {
  title: "Components/Modals/Room/EditRoomModal",
  component: EditRoomModal,
  argTypes: {
    onClose: { action: "onClose" },
    onEditRoom: { action: "onEditRoom" },
  },
  decorators: [
    (Story) => (
      <ChakraProvider theme={themeColor}>
        <MemoryRouter>{Story()}</MemoryRouter>
      </ChakraProvider>
    ),
  ],
  tags: ["autodocs"],
} as Meta<typeof EditRoomModal>;

const Template: StoryFn<typeof EditRoomModal> = (args) => (
  <EditRoomModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  initialRoomData: {
    roomNumber: "101",
    bedType: "Double",
    roomFloor: "1",
    roomFacility: "AC, shower, Double bed, TV",
    roomStatus: "Available",
  } as RoomData,
  onClose: () => console.log("Modal closed"),
  onEditRoom: (data: RoomData) => console.log("Room edited:", data),
};
