import { Meta, StoryFn } from "@storybook/react";
import LabelRate, { LabelRateProps } from "./index";
import { RateData } from "@/interfaces/Rate";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";


const theme = extendTheme({
  colors: {
    blue: {
      100: "#d4e5fa",
      400: "#589af7",
      500: "#1570ef",
      600: "#1366d9",
      800: "#0c3e83",
    },
    grey: {
      50: "#f0f1f3",
      100: "#f0d3d9",
      300: "#989fad",
      500: "#667085",
      400: "#858d9d",
      600: "#5d6679",
      700: "#48505e",
      800: "#383e49",
      900: "#2b2f38",
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
  title: "Components/Label/LabelRate",
  component: LabelRate,
  decorators: [
    (Story) => <ChakraProvider theme={theme}>{Story()}</ChakraProvider>,
  ],
} as Meta;

// Template for the story
const Template: StoryFn<LabelRateProps> = (args) => <LabelRate {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  width: "1100px",
  onAddRate: (rateData: RateData) => {
    alert(`New rate added with room type: ${rateData.roomType}`);
  },
};
