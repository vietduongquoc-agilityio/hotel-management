import { Meta, StoryFn } from "@storybook/react";
import { Spinner, Box, SpinnerProps, ChakraProvider } from "@chakra-ui/react";
import LoadingSpinner from ".";
import { MemoryRouter } from "react-router-dom";
import { themeColor } from "@/themes/Base/colors";

export default {
  title: "Components/LoadingSpinner",
  component: LoadingSpinner,
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["xs", "sm", "md", "lg", "xl"],
      },
      description: "The size of the spinner",
      defaultValue: "xl",
    },
    color: {
      control: "color",
      description: "The color of the spinner",
      defaultValue: "blue.500",
    },
  },
  decorators: [
    (Story) => (
      <ChakraProvider theme={themeColor}>
        <MemoryRouter>{Story()}</MemoryRouter>
      </ChakraProvider>
    ),
  ],
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn<SpinnerProps> = (args) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100px"
  >
    <Spinner {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  size: "xl",
  color: "blue.500",
};
