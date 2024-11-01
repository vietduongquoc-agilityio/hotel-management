import React, { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import Input, { InputType } from "./index";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {
    placeHolder: { control: "text" },
    inputType: { control: { type: "radio", options: ["first", "second"] } },
    value: { control: "text" },
    onChange: { action: "changed" },
  },
} as Meta<typeof Input>;

const Template: StoryFn = (args) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    args.onChange(e);
  };

  return (
    <Input
      placeHolder={""}
      inputType={"first"}
      {...args}
      value={value}
      onChange={handleChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  placeHolder: "Enter text...",
  inputType: "first" as InputType,
};
