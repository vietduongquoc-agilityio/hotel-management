import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom";

// Components
import AddDealModal from ".";

// Theme
import { themeColor } from "@/themes/Base";

export default {
  title: "Components/Modals/Deal/AddDealModal",
  component: AddDealModal,
  decorators: [
    (Story) => (
      <ChakraProvider theme={themeColor}>
        <MemoryRouter>{Story()}</MemoryRouter>
      </ChakraProvider>
    ),
  ],
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn<typeof AddDealModal> = (args) => {
  return (
    <>
      <AddDealModal {...args} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  onClose: () => alert("Modal closed"),
  width: "500px"
};
