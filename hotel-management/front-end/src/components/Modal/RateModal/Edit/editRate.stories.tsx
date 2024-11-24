import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";

// Components
import EditRateModal from "./";

// Mock Data
import { RateData } from "@/interfaces";

// Theme
import { themeColor } from "@/themes/Base/colors";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Components/Modals/Rate/EditRateModal",
  component: EditRateModal,
  decorators: [
    (Story) => (
      <ChakraProvider theme={themeColor}>
        <MemoryRouter>{Story()}</MemoryRouter>
      </ChakraProvider>
    ),
  ],
  tags: ["autodocs"],
} as Meta<typeof EditRateModal>;

const Template: StoryFn<typeof EditRateModal> = (args) => {
  return (
    <>
      <EditRateModal
        {...args}
        onEditRate={(updatedRate: RateData) => {
          args.onEditRate(updatedRate);
        }}
      />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  initialRateData: {
    id: "1",
    roomType: "Deluxe Room",
    cancellationPolicy: "24-hour notice",
    totalOfRooms: 10,
    dealPrice: "150",
    deals: "Weekend Offer",
    rate: "150",
    availability: "Available",
    totalOfBooked: 2,
  },
};
