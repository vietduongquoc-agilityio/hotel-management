import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import Pagination from "./index";

export default {
  title: "Components/Pagination",
  component: Pagination,
  argTypes: {
    currentPage: {
      control: { type: "number" },
      description: "The current page being displayed",
    },
    pageCount: {
      control: { type: "number" },
      description: "Total number of pages",
    },
    pageSize: {
      control: { type: "number" },
      description: "Number of items per page",
    },
  },
} as Meta;

const Template: StoryFn = (args) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);

  return (
    <Pagination
      pageSize={15}
      pageCount={2}
      {...args}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  currentPage: 1,
  pageCount: 5,
  pageSize: 10,
};

export const MidPage = Template.bind({});
MidPage.args = {
  currentPage: 3,
  pageCount: 10,
  pageSize: 10,
};

export const LastPage = Template.bind({});
LastPage.args = {
  currentPage: 10,
  pageCount: 10,
  pageSize: 10,
};

export const SinglePage = Template.bind({});
SinglePage.args = {
  currentPage: 1,
  pageCount: 1,
  pageSize: 10,
};
