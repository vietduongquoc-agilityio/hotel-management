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
          "first",
          "nextButton",
          "paginationButton",
          "cancelButton",
          "deleteButton",
        ],
      },
    },
    onClick: { action: "clicked" },
  },
  tags: ['autodocs'],
} as Meta<typeof Button>;

const Template: StoryFn = (args) => (
  <Button text={""} buttonType={"first"} {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: "Button",
  buttonType: "first" as buttonType,
};

export const Next = Template.bind({});
Next.args = {
  text: "Next",
  buttonType: "nextButton" as buttonType,
};

export const Pagination = Template.bind({});
Pagination.args = {
  text: "1",
  buttonType: "paginationButton" as buttonType,
};

export const Cancel = Template.bind({});
Cancel.args = {
  text: "Cancel",
  buttonType: "cancelButton" as buttonType,
};

export const Delete = Template.bind({});
Delete.args = {
  text: "Delete",
  buttonType: "deleteButton" as buttonType,
};
