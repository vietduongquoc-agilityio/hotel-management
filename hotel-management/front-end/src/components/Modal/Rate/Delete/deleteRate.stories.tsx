import { useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import DeleteRate from ".";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { themeColor } from "@/themes/Base/colors";

// Mock Services
const mockDeleteRateService = async (rateId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(rateId);
    }, 1000);
  });
};

// Mock Props
const Template: StoryFn = (args) => {
  const [rates, setRates] = useState(["rate1", "rate2", "rate3"]);

  const handleDeleteRate = (rateId: string) => {
    setRates(rates.filter((rate) => rate !== rateId));
  };

  return (
    <ChakraProvider theme={themeColor}>
      <Box m={4}>
        <h2>Rates</h2>
        {rates.map((rateId) => (
          <Box key={rateId} mb={4}>
            <DeleteRate
              rateId={rateId}
              onDeleteRate={handleDeleteRate}
              {...args}
            />
          </Box>
        ))}
      </Box>
    </ChakraProvider>
  );
};

export default {
  title: "Components/Modals/Rate/DeleteRate",
  component: DeleteRate,
  argTypes: {},
  tags: ["autodocs"],
} as Meta;

// Default Story
export const Default = Template.bind({});
Default.args = {
  // Mock function to simulate API behavior
  deleteRate: mockDeleteRateService,
};
