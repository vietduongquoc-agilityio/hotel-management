import { Meta, StoryFn } from "@storybook/react";
import Header, { HeaderProps } from "./index";
import { ChakraProvider, theme } from "@chakra-ui/react";

export default {
  title: "Layouts/Header",
  component: Header,
  decorators: [
    (Story) => <ChakraProvider theme={theme}>{Story()}</ChakraProvider>,
  ],
  argTypes: {
    placeholder: { control: "text" },
  },
} as Meta;

const Template: StoryFn<HeaderProps> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "Search for rooms and offers",
};

export const CustomPlaceholder = Template.bind({});
CustomPlaceholder.args = {
  placeholder: "Search by name or ID",
};
