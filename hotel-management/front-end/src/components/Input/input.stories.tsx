import { Meta, StoryFn } from "@storybook/react";
import { themeColor } from "@/themes/Base/colors";
import { ChakraProvider } from "@chakra-ui/react";
import Input from ".";

export default {
  title: "Components/Input",
  component: Input,
  decorators: [
    (Story) => <ChakraProvider theme={themeColor}>{Story()}</ChakraProvider>,
  ],
  argTypes: {
    placeHolder: {
      control: "text",
      description: "Placeholder text for the input",
    },
    inputType: {
      control: { type: "select" },
      options: ["primary", "number"],
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Input>;

const Template: StoryFn = (args) => (
  <Input placeHolder={""} inputType={"primary"} {...args} />
);

export const Default = Template.bind({});
Default.args = {
  placeHolder: "Enter text",
  inputType: "primary",
  width: "300px",
};

export const Numeric = Template.bind({});
Numeric.args = {
  placeHolder: "Enter a number",
  inputType: "number",
  width: "300px",
};
