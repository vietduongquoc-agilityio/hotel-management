import { Meta, StoryFn } from "@storybook/react";
import Header, { HeaderProps } from "./index";

export default {
  title: "Layouts/Header",
  component: Header,
  argTypes: {
    placeholder: { control: "text" },
    search: { control: "text" },
  },
} as Meta;

const Template: StoryFn<HeaderProps> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "Search for rooms and offer",
};

export const CustomPlaceholder = Template.bind({});
CustomPlaceholder.args = {
  placeholder: "Search for something else...",
};
