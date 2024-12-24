import { themeColor } from "@/themes/Base/colors";
import { ChakraProvider } from "@chakra-ui/react";
import { Meta, StoryFn } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

// Components
import LabelGuest, { LabelGuestProps } from "./index";
import { useGuestStore } from "@/stores";

// Mock Data for Select Options
const mockGuestNameOptions = [
  { value: "john", label: "John Doe" },
  { value: "jane", label: "Jane Doe" },
];

const mockStayOptions = [
  { value: "1", label: "1 Night" },
  { value: "2", label: "2 Nights" },
];

const mockPriceOptions = [
  { value: "100", label: "$100" },
  { value: "200", label: "$200" },
];

useGuestStore.setState({
    guestNameOptions: mockGuestNameOptions,
    stayOptions: mockStayOptions,
    priceOptions: mockPriceOptions,
});


export default {
  title: "Components/Label/LabelGuest",
  component: LabelGuest,
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
const Template: StoryFn<LabelGuestProps> = (args) => <LabelGuest {...args} />;

// Default Story
export const Default = Template.bind({});
Default.args = {
  selectedGuestName: "",
  selectedStay: "",
  selectedPrice: "",
  isAddGuest: false,
  onAddGuest: (roomData) => {
    alert(`Guest added: ${JSON.stringify(roomData)}`);
  },
  handleSelectedBedType: (event) => {
    console.log("Bed type selected:", event.target.value);
  },
  handleSelectedGuestName: (event) => {
    console.log("Guest name selected:", event.target.value);
  },
  handleSelectedStay: (event) => {
    console.log("Stay selected:", event.target.value);
  },
  handleSelectedPrice: (event) => {
    console.log("Price selected:", event.target.value);
  },
};

