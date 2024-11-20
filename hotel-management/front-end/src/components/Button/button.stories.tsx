import { Meta, StoryFn } from "@storybook/react";
import { themeColor } from "@/themes/Base/colors";
import { ChakraProvider } from "@chakra-ui/react";

// Components
import Button, { buttonType } from ".";

export default {
  title: "Components/Button",
  component: Button,
  decorators: [
    (Story) => <ChakraProvider theme={themeColor}>{Story()}</ChakraProvider>,
  ],
  argTypes: {
    text: { control: "text" },
    buttonType: {
      control: {
        type: "radio",
        options: ["primary", "disabled", "pagination", "secondary", "error"],
      },
    },
    onClick: { action: "clicked" },
  },
  tags: ["autodocs"],
} as Meta<typeof Button>;

const Template: StoryFn = (args) => (
  <Button text={""} buttonType={"primary"} {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  text: "Button",
  buttonType: "primary" as buttonType,
};

export const Disabled = Template.bind({});
Disabled.args = {
  text: "Next",
  buttonType: "disabled" as buttonType,
};

export const Pagination = Template.bind({});
Pagination.args = {
  text: "1",
  buttonType: "pagination" as buttonType,
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: "Cancel",
  buttonType: "secondary" as buttonType,
};

export const Error = Template.bind({});
Error.args = {
  text: "Delete",
  buttonType: "error" as buttonType,
};
