import { StoryFn } from "@storybook/react";
import Label, { LabelProps } from "./index";
import { BrowserRouter as Router } from "react-router-dom";

export default {
  title: "Components/Label",
  component: Label,
};

const Template: StoryFn<LabelProps> = (args) => (
  <Router>
    <Label {...args} />
  </Router>
);

export const Default = Template.bind({});
Default.args = {};
