import { StoryFn } from "@storybook/react";
import Sidebar from ".";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { themeColor } from "@/themes/Base/colors";

export default {
  title: "Layouts/Sidebar",
  component: Sidebar,
  decorators: [
    (Story: any) => (
      <ChakraProvider theme={themeColor}>{Story()}</ChakraProvider>
    ),
  ],
  tags: ["autodocs"],
};

const Template: StoryFn = (args) => (
  <Router>
    <Sidebar {...args} />
  </Router>
);

export const Default = Template.bind({});
Default.args = {
};
