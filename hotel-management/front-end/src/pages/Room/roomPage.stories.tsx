import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom";
import { themeColor } from "@/themes/Base/colors";

// Components
import RoomPage from ".";

// Mock Data and Decorators
const queryClient = new QueryClient();

export default {
  title: "Pages/RoomPage",
  component: RoomPage,
  decorators: (Story) => (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={themeColor}>
        <MemoryRouter>{Story()}</MemoryRouter>
      </ChakraProvider>
    </QueryClientProvider>
  ),
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn = (args) => <RoomPage {...args} />;

// Default Story
export const Default = Template.bind({});
Default.args = {
};
