import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import LabelGuest from "./index";
import { themeColor } from "@/themes/Base/colors";

export default {
  title: "Components/Label/LabelGuest",
  component: LabelGuest,
  decorators: [
    (Story) => (
      <ChakraProvider theme={themeColor}>
        <Story />
      </ChakraProvider>
    ),
  ],
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn = (args) => <LabelGuest {...args} />;

export const Default = Template.bind({});
Default.args = {};
