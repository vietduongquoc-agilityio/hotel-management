import { Meta, StoryFn } from "@storybook/react";
import Input from ".";

export default {
  title: "Components/Input",
  component: Input,
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
} as Meta<typeof Input>;

const Template: StoryFn = (args) => (
  <Input placeHolder={""} inputType={"first"} {...args} />
);

export const FirstInputType = Template.bind({});
FirstInputType.args = {
  placeHolder: "Enter text",
  inputType: "first",
};

export const SecondInputType = Template.bind({});
SecondInputType.args = {
  placeHolder: "Enter text",
  inputType: "second",
};
