import { Meta, StoryFn } from "@storybook/react";
import Button, { buttonType } from ".";
import { ChakraProvider } from "@chakra-ui/react";
import { themeColor } from "@/themes/Base/colors";

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
        options: [
          "primary",
          "disabled",
          "pagination",
          "secondary",
          "error",
        ],
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

export const Next = Template.bind({});
Next.args = {
  text: "Next",
  buttonType: "disabled" as buttonType,
};

export const Pagination = Template.bind({});
Pagination.args = {
  text: "1",
  buttonType: "pagination" as buttonType,
};

export const Cancel = Template.bind({});
Cancel.args = {
  text: "Cancel",
  buttonType: "secondary" as buttonType,
};

export const Delete = Template.bind({});
Delete.args = {
  text: "Delete",
  buttonType: "error" as buttonType,
};
