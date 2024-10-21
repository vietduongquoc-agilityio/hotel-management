import { StoryFn } from "@storybook/react";
import Button, { ButtonProps } from "./index";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
    size: { control: "select", options: ["lg", "md", "sm"] },
    borderRadius: { control: "number" },
    color: { control: "color" },
    fontSize: { control: "text" },
    fontWeight: { control: "text" },
    width: { control: "number" },
    height: { control: "number" },
    border: { control: "text" },
  },
};

const Template: StoryFn<ButtonProps> = (args: ButtonProps) => (
  <Button {...args} />
);

export const Large = Template.bind({});
Large.args = {
  className: "btn-large",
  label: "Large Button",
  size: "lg",
  backgroundColor: "#1570ef",
  borderRadius: 8,
  color: "white",
  width: 150,
  height: 50,
  handleClick: () => console.log("Large Button clicked"),
  border: "none",
};

export const Medium = Template.bind({});
Medium.args = {
  className: "btn-medium",
  label: "Medium Button",
  size: "md",
  backgroundColor: "#1570ef",
  borderRadius: 8,
  color: "white",
  width: 130,
  height: 45,
  handleClick: () => console.log("Medium Button clicked"),
  border: "none",
};

export const Small = Template.bind({});
Small.args = {
  className: "btn-small",
  label: "Small Button",
  size: "sm",
  backgroundColor: "#1570ef",
  borderRadius: 8,
  color: "white",
  width: 110,
  height: 40,
  handleClick: () => console.log("Small Button clicked"),
  border: "none",
};
