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
        options: ["primary", "secondary", "surface", "warning", "error"],
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

export const Secondary = Template.bind({});
Secondary.args = {
  text: "Next",
  buttonType: "secondary" as buttonType,
};

export const Surface = Template.bind({});
Surface.args = {
  text: "1",
  buttonType: "surface" as buttonType,
};

export const Warning = Template.bind({});
Warning.args = {
  text: "Cancel",
  buttonType: "warning" as buttonType,
};

export const Error = Template.bind({});
Error.args = {
  text: "Delete",
  buttonType: "error" as buttonType,
};
