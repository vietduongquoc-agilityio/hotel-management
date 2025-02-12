import { themeColor } from "@/themes/Base/colors";
import { ChakraProvider } from "@chakra-ui/react";
import { Meta, StoryFn } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

// Components
import LabelRoom, { LabelRoomProps } from "./index";

// InterFace
import { NewRoomData } from "@/interfaces";

// Store
import { useRateStore } from "@/stores";

const mockBedTypeOptions = [
  { value: "single", label: "Single" },
  { value: "double", label: "Double" },
  { value: "suite", label: "Suite" },
];

// Mock Zustand Store for Storybook
useRateStore.setState({
  bedTypeOptions: mockBedTypeOptions,
});

export default {
  title: "Components/Label/LabelRoom",
  component: LabelRoom,
  decorators: [
    (Story) => (
      <ChakraProvider theme={themeColor}>
        <MemoryRouter>{Story()}</MemoryRouter>
      </ChakraProvider>
    ),
  ],
  argTypes: {
    width: { control: "text" },
  },
  tags: ["autodocs"],
} as Meta;

// Template for the story
const Template: StoryFn<LabelRoomProps> = (args) => <LabelRoom {...args} />;

// Default Story
export const Default = Template.bind({});
Default.args = {
  width: "980px",
  totalRooms: 21,
  availableRooms: 3,
  bookedRooms: 18,
  onAddRoom: async (roomData: NewRoomData) => {
    alert(`Room added: ${JSON.stringify(roomData)}`);
  },
  isAddRoom: true,
  selectedRoomFloor: "",
  selectedRoomStatus: "",
  handleSelectedBedType: (event) => {
    console.log("Bed type selected:", event.target.value);
  },
  handleSelectedRoomFloor: (event) => {
    console.log("Room floor selected:", event.target.value);
  },
  handleSelectedRoomStatus: (event) => {
    console.log("Room status selected:", event.target.value);
  },
};
