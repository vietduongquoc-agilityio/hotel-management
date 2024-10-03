import Input, { InputProps } from "./input";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Components/Input",
  Component: Input,
  argTypes: {
    handleChange: {
      action: "handleChange",
      direction: {
        control: {
          type: "select",
          options: ["row", "column", "row-reverse", "column-reverse"],
        },
      },
      borderRadius: { control: { type: "number" } },
      color: { control: { type: "string" } },
    },
  },
} as Meta<typeof Input>;

const Template: StoryFn<InputProps> = (args: InputProps) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  direction: "column",
  label: "Email",
  backgroundColor: "White",
  size: "md",
  borderRadius: 5,
  color: "black",
};

export const SizeSmall = Template.bind({});
SizeSmall.args = {
  direction: "column",
  label: "Email",
  backgroundColor: "White",
  size: "sm",
  borderRadius: 5,
  color: "black",
};
