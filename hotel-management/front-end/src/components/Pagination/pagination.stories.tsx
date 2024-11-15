import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import Pagination from ".";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// Custom Theme
const theme = extendTheme({
  colors: {
    grey: {
      50: "#F7FAFC",
      500: "#718096",
      900: "#1A202C",
    },
    blue: {
      100: "#d4e5fa",
      400: "#589af7",
      500: "#1570ef",
      600: "#1366d9",
      800: "#0c3e83",
    },
    success: {
      50: "#e7f8f0",
      400: "#41c588",
    },
    error: {
      50: "#feeceb",
      400: "#f36960",
    },
    warning: {
      50: "#fef4e6",
      400: "#f9a63a",
    },
    white: {
      200: "#ffffff",
    },
  },
});

export default {
  title: "Components/Pagination",
  component: Pagination,
  decorators: [
    (Story) => <ChakraProvider theme={theme}>{Story()}</ChakraProvider>,
  ],
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
