import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider } from "@chakra-ui/react";
import { themeColor } from "@/themes/Base/colors";
import LabelDeal from "./index";

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

const Template: StoryFn = (args) => (
  <LabelDeal
    isAddDeal={false}
    onAddDeal={function (): void {
      throw new Error("Function not implemented.");
    }}
    handleSelectedBedType={function (): void {
      throw new Error("Function not implemented.");
    }}
    {...args}
  />
);

export const Default = Template.bind({});
Default.args = {};
