import { Box, ChakraProvider } from "@chakra-ui/react";
import { themeColor } from "@/themes/Base/colors";
import { Meta, StoryFn } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

// Components
import RatePage from "./index";

export default {
  title: "Pages/Rate",
  component: RatePage,
  decorators: (Story) => (
    <ChakraProvider theme={themeColor}>
      <MemoryRouter>{Story()}</MemoryRouter>
    </ChakraProvider>
  ),
  tags: ["autodocs"],
} as Meta;

// Template for the story
const Template: StoryFn = () => (
  <Box w="950px" h="100%">
    <RatePage />
  </Box>
);
// Default Story
export const Default = Template.bind({});
Default.args = {};

