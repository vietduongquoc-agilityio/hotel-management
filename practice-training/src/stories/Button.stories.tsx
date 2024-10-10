import React from "react";
import Button, { ButtonProps } from "../Components/Button/Button";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    handleClick: {
      action: "handleClick",
    },
    borderRadius: { control: { type: "number" } },
  },
  color: { control: { type: "string" } },
} as Meta<typeof Button>;

const Template: StoryFn<ButtonProps> = (args: ButtonProps) => (
  <Button {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "Press me",
  backgroundColor: "rgb(225, 223, 223)",
  size: "md",
  borderRadius: 10,
  color: "black"
};

export const Enable = Template.bind({});
Enable.args = {
  label: "Press me",
  backgroundColor: "orangered",
  size: "md",
  borderRadius: 10,
  color: "white"
};
