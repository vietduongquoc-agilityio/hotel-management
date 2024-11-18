import { Meta, StoryFn } from "@storybook/react";
import LabelRoom, { LabelRoomProps } from "./index";
import { NewRoomData } from "@/interfaces/Room";
import { useRateStore } from "@/store/RateStore";
import { ChakraProvider } from "@chakra-ui/react";
import { themeColor } from "@/themes/Base/colors";

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
    (Story) => <ChakraProvider theme={themeColor}>{Story()}</ChakraProvider>,
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
  width: "1100px",
  totalRooms: 21,
  availableRooms: 3,
  bookedRooms: 18,
  onAddRoom: async (roomData: NewRoomData) => {
    alert(`Room added: ${JSON.stringify(roomData)}`);
  },
  isAddRoom: true,
  selectedBedType: "",
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
