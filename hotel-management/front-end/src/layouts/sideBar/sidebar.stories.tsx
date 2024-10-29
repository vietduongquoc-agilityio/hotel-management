import { StoryFn } from "@storybook/react";
import Sidebar from "./index";
import { BrowserRouter as Router } from "react-router-dom";

export default {
  title: "Layouts/Sidebar",
  component: Sidebar,
};

const Template: StoryFn = (args: any) => (
  <Router>
    <Sidebar {...args} />
  </Router>
);

export const Default = Template.bind({});
Default.args = {};
