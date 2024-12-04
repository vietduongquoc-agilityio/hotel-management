import { Box, Heading } from "@chakra-ui/react";

// Components
import { LabelDeal } from "@/components";

const DealPage = () => {
  return (
    <Box>
      <Heading mb="16px" fontSize="12px" fontWeight="500" color="grey.500">
        Deal
      </Heading>

      <LabelDeal />
    </Box>
  );
};

export default DealPage;