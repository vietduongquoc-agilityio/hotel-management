import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom";

// Components
import AddGuestModal from ".";

// Theme
import { themeColor } from "@/themes/Base/colors";

export default {
  title: "Components/Modals/Guest/AddGuestModal",
  component: AddGuestModal,
  decorators: [
    (Story) => (
      <ChakraProvider theme={themeColor}>
        <MemoryRouter>{Story()}</MemoryRouter>
      </ChakraProvider>
    ),
  ],
  tags: ["autodocs"],
} as Meta<typeof AddGuestModal>;

const Template: StoryFn<typeof AddGuestModal> = (args) => {
  return (
    <>
      <AddGuestModal {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
