import { Meta, StoryFn } from "@storybook/react";
import Button, { buttonType } from ".";

export default {
  title: "Components/Button",
  component: Button,
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
} as Meta<typeof Button>;

const Template: StoryFn = (args) => (
  <Button text={""} buttonType={"first"} {...args} />
);

export const First = Template.bind({});
First.args = {
  text: "First Button",
  buttonType: "first" as buttonType,
};

export const Next = Template.bind({});
Next.args = {
  text: "Next Button",
  buttonType: "nextButton" as buttonType,
};

export const Pagination = Template.bind({});
Pagination.args = {
  text: "1",
  buttonType: "paginationButton" as buttonType,
};

export const Cancel = Template.bind({});
Cancel.args = {
  text: "Cancel Button",
  buttonType: "cancelButton" as buttonType,
};

export const Delete = Template.bind({});
Delete.args = {
  text: "Delete Button",
  buttonType: "deleteButton" as buttonType,
};
