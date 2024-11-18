import { Meta, StoryFn } from "@storybook/react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import RoomPage from "./index";
import { themeColor } from "@/themes/Base/colors";
import { MemoryRouter } from "react-router-dom";

// Storybook metadata
export default {
  title: "Pages/RoomPage",
  component: RoomPage,
  decorators: (Story) => (
    <ChakraProvider theme={themeColor}>
      <MemoryRouter>{Story()}</MemoryRouter>
    </ChakraProvider>
  ),
  tags: ["autodocs"],
} as Meta;

// Template
const Template: StoryFn = (args) => (
  <Box w="970px" h="100%">
    <RoomPage {...args} />
  </Box>
);

// Stories
export const Default = Template.bind({});
Default.args = {};
