import { themeColor } from "@/themes/Base/colors";
import { ChakraProvider } from "@chakra-ui/react";
import { Meta, StoryFn } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

// Components
import LabelRate, { LabelRateProps } from "./index";

// InterFace
import { RateData } from "@/interfaces/Rate";

export default {
  title: "Components/Label/LabelRate",
  component: LabelRate,
  decorators: [
    (Story) => (
      <ChakraProvider theme={themeColor}>
        <MemoryRouter>{Story()}</MemoryRouter>
      </ChakraProvider>
    ),
  ],
  tags: ["autodocs"],
} as Meta;

// Template for the story
const Template: StoryFn<LabelRateProps> = (args) => <LabelRate {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  width: "900px",
  onAddRate: (rateData: RateData) => {
    alert(`New rate added with room type: ${rateData.roomType}`);
  },
};
