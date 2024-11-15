import { StoryFn, Meta } from "@storybook/react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import TableRate, { TableRateProps } from ".";
import { RateData } from "@/interfaces/Rate";
import { themeColor } from "@/themes/Base/colors";

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

export default {
  title: "Components/Tables/TableRate",
  component: TableRate,
  decorators: [
    (Story) => <ChakraProvider theme={themeColor}>{Story()}</ChakraProvider>,
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
