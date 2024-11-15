import { Meta, StoryFn } from "@storybook/react";
import LabelRate, { LabelRateProps } from "./index";
import { RateData } from "@/interfaces/Rate";
import { ChakraProvider } from "@chakra-ui/react";
import { themeColor } from "@/themes/Base/colors";

export default {
  title: "Components/Label/LabelRate",
  component: LabelRate,
  decorators: [
    (Story) => <ChakraProvider theme={themeColor}>{Story()}</ChakraProvider>,
  ],
} as Meta;

// Template for the story
const Template: StoryFn<LabelRateProps> = (args) => <LabelRate {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  width: "1100px",
  onAddRate: (rateData: RateData) => {
    alert(`New rate added with room type: ${rateData.roomType}`);
  },
};
