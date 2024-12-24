import { ChakraProvider } from "@chakra-ui/react";
import { Meta, StoryFn } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { themeColor } from "@/themes/Base/colors";

// Components
import LabelDeal, { LabelDealProps } from "./index";


export default {
  title: "Components/Label/LabelDeal",
  component: LabelDeal,
  decorators: [
    (Story) => (
      <ChakraProvider theme={themeColor}>
        <MemoryRouter>{Story()}</MemoryRouter>
      </ChakraProvider>
    ),
  ],
  argTypes: {
    isAddDeal: { control: "boolean" },
  },
  tags: ["autodocs"],
} as Meta;

// Template for the story
const Template: StoryFn<LabelDealProps> = (args) => <LabelDeal {...args} />;

// Default Story
export const Default = Template.bind({});
Default.args = {
  isAddDeal: true,
  onAddDeal: (dealData) => {
    alert(`Deal added: ${JSON.stringify(dealData)}`);
  },
  handleSelectedBedType: (event) => {
    console.log("Bed type selected:", event.target.value);
  },
};
