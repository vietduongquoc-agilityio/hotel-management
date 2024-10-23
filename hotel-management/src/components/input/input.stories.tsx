import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import Input, { InputProps } from "./index"; 

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {
    backgroundColor: { control: "color" },
    color: { control: "color" },
    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
      },
    },
    direction: {
      control: {
        type: "select",
        options: ["row", "column", "row-reverse", "column-reverse"],
      },
    },
  },
} as Meta;

const Template: StoryFn<InputProps> = (args) => {
  const [value, setValue] = useState(args.value || "");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (args.onChange) {
      args.onChange(event);
    }
  };

  return <Input {...args} value={value} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  label: "Default Input",
  placeholder: "Search for rooms and offer",
  type: "text",
  value: "",
  size: "md",
  backgroundColor: "#fff",
  color: "#000",
  borderRadius: 4,
  direction: "column",
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  label: "Input with Placeholder",
  placeholder: "Search for rooms and offer",
  type: "text",
  value: "",
};

export const LargeInput = Template.bind({});
LargeInput.args = {
  label: "Large Input",
  placeholder: "Search for rooms and offer",
  type: "text",
  size: "lg",
  value: "",
};

export const SmallInput = Template.bind({});
SmallInput.args = {
  label: "Small Input",
  placeholder: "Search for rooms and offer",
  type: "text",
  size: "sm",
  value: "",
};

export const WithCustomColor = Template.bind({});
WithCustomColor.args = {
  label: "Custom Colored Input",
  placeholder: "Search for rooms and offer",
  type: "text",
  value: "",
  backgroundColor: "#e0f7fa",
  color: "#00796b",
};
