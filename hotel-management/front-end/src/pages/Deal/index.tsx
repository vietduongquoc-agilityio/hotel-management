import LabelDeal from "@/components/Label/Deal";
import { Box, Heading } from "@chakra-ui/react";

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