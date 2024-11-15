import { StoryFn, Meta } from "@storybook/react";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import TableRate, { TableRateProps } from ".";
import { RateData } from "@/interfaces/Rate";

// Mock Data
const mockRates: RateData[] = [
  {
    documentId: "1",
    roomType: "King",
    cancellationPolicy: "Flexible",
    dealPrice: "1000",
    deals: "10% off",
    rate: "1000$",
    totalOfRooms: 10,
    totalOfBooked: 5,
  },
  {
    documentId: "2",
    roomType: "Standard",
    cancellationPolicy: "Non-refundable",
    dealPrice: "100",
    deals: "5% off",
    rate: "95",
    totalOfRooms: 20,
    totalOfBooked: 20,
  },
];

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
  title: "Components/Tables/TableRate",
  component: TableRate,
  decorators: [
    (Story) => <ChakraProvider theme={theme}>{Story()}</ChakraProvider>,
  ],
} as Meta;

// Template Function
const Template: StoryFn<TableRateProps> = (args) => (
  <Box w="1000px" h="100%">
    <TableRate {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  rates: mockRates,
  onDeleteRate: (rateId: string) => alert(`Deleted rate with ID: ${rateId}`),
  onEditRate: (updatedRateData: RateData) =>
    alert(`Edited rate with ID: ${updatedRateData.documentId}`),
};

// Story for No Rates
export const NoRates = Template.bind({});
NoRates.args = {
  rates: [],
  error: null,
  onDeleteRate: (rateId: string) => alert(`Deleted rate with ID: ${rateId}`),
  onEditRate: (updatedRateData: RateData) =>
    alert(`Edited rate with ID: ${updatedRateData.documentId}`),
};

// Story for Error State
export const ErrorState = Template.bind({});
ErrorState.args = {
  rates: [],
  error: "Failed to load rates. Please try again.",
  onDeleteRate: (rateId: string) => alert(`Deleted rate with ID: ${rateId}`),
  onEditRate: (updatedRateData: RateData) =>
    alert(`Edited rate with ID: ${updatedRateData.documentId}`),
};
