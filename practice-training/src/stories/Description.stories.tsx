import { Meta, StoryFn } from "@storybook/react";
import Description, { DescriptionProps } from "../Components/Description/Description";
import React from "react";

export default {
  title: "Components/Description",
  component: Description,
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

const Template: StoryFn<DescriptionProps> = (args) => <Description {...args} />;

export const Default = Template.bind({});
Default.args = {
  descriptionText: "Sign in to continue to your Digital Library",
  spacing: 1,
  direction: "row",
  color: "rgb(84, 82, 82)",
  fontsize: "md",
};

export const SmallFontSize = Template.bind({});
SmallFontSize.args = {
  descriptionText: "Sign in to continue to your Digital Library",
  spacing: 2,
  direction: "column",
  color: "rgb(84, 82, 82)",
  fontsize: "sm",
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  descriptionText: "Sign in to continue to your Digital Library",
  spacing: 1,
  direction: "row",
  color: "blue",
  fontsize: "lg",
};

export const TextFooter = Template.bind({});
TextFooter.args = {
  descriptionText: "New User? Register Here",
  spacing: 1,
  direction: "row",
  color: "orangered",
  fontsize: "lg",
};

export const TextFooterHover = Template.bind({});
TextFooterHover.args = {
  descriptionText: "Register Here",
  spacing: 1,
  direction: "row",
  color: "Blue",
  fontsize: "lg",
};

export const successMessage = Template.bind({});
successMessage.args = {
  descriptionText: "Login successful!",
  spacing: 1,
  direction: "row",
  color: "rgb(6, 184, 6)",
  fontsize: "lg",
};
