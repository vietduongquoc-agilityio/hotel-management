import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import LabelDeal from "./index";
import { themeColor } from "@/themes/Base/colors";

export default {
  title: "Components/Label/LabelDeal",
  component: LabelDeal,
  decorators: [
    (Story) => (
      <ChakraProvider theme={themeColor}>
        <Story />
      </ChakraProvider>
    ),
  ],
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn = (args) => <LabelDeal {...args} />;

export const Default = Template.bind({});
Default.args = {};
