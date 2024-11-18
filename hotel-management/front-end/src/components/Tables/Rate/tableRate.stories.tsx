import { StoryFn, Meta } from "@storybook/react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import TableRate, { TableRateProps } from ".";
import { RateData } from "@/interfaces/Rate";
import { themeColor } from "@/themes/Base/colors";
import { mockRates } from "@/mocks/rate";

export default {
  title: "Components/Tables/TableRate",
  component: TableRate,
  decorators: [
    (Story) => <ChakraProvider theme={themeColor}>{Story()}</ChakraProvider>,
  ],
  tags: ['autodocs'],
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