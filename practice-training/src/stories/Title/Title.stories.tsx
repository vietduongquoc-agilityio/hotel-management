import { Meta, StoryFn } from "@storybook/react";
import Title, { TitleProps } from "./Title";

export default {
  title: "Components/Title",
  component: Title,
  argTypes: {
    spacing: { control: { type: "number" } },
    direction: {
      control: {
        type: "select",
        options: ["row", "column", "row-reverse", "column-reverse"],
      },
    },
    color: { control: "color" },
  },
} as Meta;

const Template: StoryFn<TitleProps> = (args) => <Title {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Welcome Back!",
  spacing: 1,
  direction: "row",
  color: "grey",
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  children: "Welcome Back!",
  spacing: 1,
  direction: "row",
  color: "blue",
};
