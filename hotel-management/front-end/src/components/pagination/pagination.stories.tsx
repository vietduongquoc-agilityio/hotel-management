import { StoryFn, Meta } from "@storybook/react";
import Pagination from "./index";

export default {
  title: "Components/Pagination",
  component: Pagination,
} as Meta<typeof Pagination>;

const Template: StoryFn = (args) => <Pagination {...args} />;

export const Default = Template.bind({});
Default.args = {};
