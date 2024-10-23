import { useState } from "react";
import Select, { SelectProps } from "./index";
import { StoryFn } from "@storybook/react";

export default {
  title: "Components/Select",
  component: Select,
  argTypes: {
    options: { control: "object" },
    value: { control: "text" },
    label: { control: "text" },
    onChange: { action: "changed" },
  },
};

const Template: StoryFn<SelectProps> = (args) => {
  const [selectedValue, setSelectedValue] = useState<string>(args.value);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    args.onChange(value);
  };

  return <Select {...args} value={selectedValue} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  options: [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ],
  value: "option1",
  label: "Choose an option",
  width: 400
};
