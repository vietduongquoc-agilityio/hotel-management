import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom";

import AddRoomModal from ".";

// Interfaces
import { NewRoomData } from "@/interfaces";

// Store
import { useRateStore } from "@/stores";

// Themes
import { themeColor } from "@/themes/Base/colors";

// Mock Store Data
useRateStore.setState({
  bedTypeOptions: [
    { value: "Single", label: "Single Bed" },
    { value: "Double", label: "Double Bed" },
    { value: "Suite", label: "Suite" },
  ],
  rates: [
    {
      roomType: "Single",
      totalOfRooms: 5,
      totalOfBooked: 2,
      documentId: "123",
      rate: "100",
      deals: "10%",
      cancellationPolicy: "Free cancellation within 24 hours",
      dealPrice: "90",
    },
    {
      roomType: "Double",
      totalOfRooms: 3,
      totalOfBooked: 3,
      documentId: "124",
      rate: "150",
      deals: "15%",
      cancellationPolicy: "Non-refundable",
      dealPrice: "135",
    },
  ],
  editRate: async (id: string, payload: any) => {
    console.log("Edit rate called with:", id, payload);
  },
});

// Mock Props
const onAddRoom = async (roomData: NewRoomData) => {
  console.log("Room added:", roomData);
};

const onClose = () => {
  console.log("Close: ", onClose);
};

const Template: StoryFn = (args) => (
  <ChakraProvider theme={themeColor}>
    <MemoryRouter>
      <AddRoomModal
        bedTypeOptions={[]}
        {...args}
        isDisabled
        onAddRoom={onAddRoom}
        onClose={onClose}
      />
    </MemoryRouter>
  </ChakraProvider>
);

export default {
  title: "Components/Modals/Room/AddRoomModal",
  component: AddRoomModal,
  tags: ["autodocs"],
} as Meta;

// Default Story
export const Default = Template.bind({});
Default.args = {
  onAddRoom,
};
