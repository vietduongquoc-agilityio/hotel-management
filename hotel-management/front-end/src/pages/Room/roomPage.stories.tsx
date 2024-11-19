import { Box, ChakraProvider } from "@chakra-ui/react";
import { themeColor } from "@/themes/Base/colors";
import { Meta, StoryFn } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

// Components
import RoomPage from "./index";

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
