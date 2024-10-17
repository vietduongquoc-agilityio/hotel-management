import { BrowserRouter as Router } from "react-router-dom";
import Sidebar, { SidebarProps } from "./index";
import { StoryFn } from "@storybook/react";
import roomIcon from "../../assets/icons/room.svg";
import logoIcon from "../../assets/icons/logo.svg";
import rateIcon from "../../assets/icons/rate.svg";

export default {
  title: "Layouts/Sidebar",
  component: Sidebar,
};

const Template: StoryFn<SidebarProps> = (args) => (
  <Router>
    <Sidebar {...args} />
  </Router>
);

export const Default = Template.bind({});
Default.args = {
  room: roomIcon,
  logo: logoIcon,
  rate: rateIcon,
};

export const WithCustomIcons = Template.bind({});
WithCustomIcons.args = {
  room: roomIcon,
  logo: logoIcon,
  rate: rateIcon,
};
