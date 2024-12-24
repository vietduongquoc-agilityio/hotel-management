import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { themeColor } from "@/themes/Base/colors";
import { Meta, StoryFn } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

// Components
import GuestPage from "./index";

// Mock Data and Decorators
const queryClient = new QueryClient();

export default {
  title: "Pages/Guest",
  component: GuestPage,
  decorators: (Story) => (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={themeColor}>
        <MemoryRouter>{Story()}</MemoryRouter>
      </ChakraProvider>
    </QueryClientProvider>
  ),
  tags: ["autodocs"],
} as Meta;

// Template for the story
const Template: StoryFn = (args) => (
  <Box w="950px" h="100%">
    <GuestPage {...args} />
  </Box>
);
// Default Story
export const Default = Template.bind({});
Default.args = {};
