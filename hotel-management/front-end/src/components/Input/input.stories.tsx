import { Meta, StoryFn } from "@storybook/react";
import Input from ".";
import { ChakraProvider } from "@chakra-ui/react";
import { themeColor } from "@/themes/Base/colors";

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
      options: ["first", "second"],
      description: "The style type of the input (e.g., 'first', 'second')",
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Input>;

const Template: StoryFn = (args) => (
  <Input placeHolder={""} inputType={"first"} {...args} />
);

export const Default = Template.bind({});
Default.args = {
  placeHolder: "Enter text",
  inputType: "first",
  width: "300px",
};
