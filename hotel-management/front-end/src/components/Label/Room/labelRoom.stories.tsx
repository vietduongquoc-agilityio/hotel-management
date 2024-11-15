import { Meta, StoryFn } from "@storybook/react";
import LabelRoom, { LabelRoomProps } from "./index";
import { NewRoomData } from "@/interfaces/Room";
import { useRateStore } from "@/store/RateStore";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

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
    (Story) => <ChakraProvider theme={theme}>{Story()}</ChakraProvider>,
  ],
  argTypes: {
    width: { control: "text" },
  },
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
