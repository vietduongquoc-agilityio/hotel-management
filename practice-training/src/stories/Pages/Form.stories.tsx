import { Meta, StoryFn } from "@storybook/react";
import Form, { FormProps } from "./Form";

export default {
  title: "Components/Form",
  component: Form,
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
      },
    },
    borderRadius: { control: { type: "number" } },
    width: { control: "text" },
  },
} as Meta;

const Template: StoryFn<FormProps> = (args) => (
  <div style={{ maxWidth: args.width }}>
    <Form {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  onSubmit: (formData) => {
    console.log("Form submitted with data:", formData);
  },
  width: "400px",
};

export const SizeSmall = Template.bind({});
SizeSmall.args = {
  onSubmit: (formData) => {
    console.log("Form submitted with data:", formData);
  },
  size: "sm",
  borderRadius: 10,
  width: "250px",
};
