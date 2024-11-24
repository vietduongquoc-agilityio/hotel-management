import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom";

// Components
import AddRateModal from "./";

// Mock Data
import { NewRateData } from "@/interfaces";

// Theme
import { themeColor } from "@/themes/Base/colors";

export default {
  title: "Components/Modals/Rate/AddRateModal",
  component: AddRateModal,
  decorators: [
    (Story) => (
      <ChakraProvider theme={themeColor}>
        <MemoryRouter>{Story()}</MemoryRouter>
      </ChakraProvider>
    ),
  ],
  tags: ["autodocs"],
} as Meta<typeof AddRateModal>;

const Template: StoryFn<typeof AddRateModal> = (args) => {
  return (
    <>
      <AddRateModal
        {...args}
        onAddRate={(newRate: NewRateData) => {
          args.onAddRate(newRate);
        }}
      />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
