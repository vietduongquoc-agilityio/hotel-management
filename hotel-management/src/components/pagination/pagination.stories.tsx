import { StoryFn } from "@storybook/react";
import Pagination from "./index";

export default {
  title: "Components/Pagination",
  component: Pagination,
};

const Template: StoryFn = (args: any) => <Pagination {...args} />;

export const Default = Template.bind({});
Default.args = {};
