import { Meta, StoryFn } from "@storybook/react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import RoomPage from "./index";
import { themeColor } from "@/themes/Base/colors";

// Storybook metadata
export default {
  title: "Pages/RoomPage",
  component: RoomPage,
  decorators: (Story) => (
    <ChakraProvider theme={themeColor}>{Story()}</ChakraProvider>
  ),
} as Meta;

// Template
const Template: StoryFn = (args) => (
  <Box w="1000px" h="100%">
    <RoomPage {...args} />
  </Box>
);

// Stories
export const Default = Template.bind({});
Default.args = {};
