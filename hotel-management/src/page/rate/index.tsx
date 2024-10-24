import { Box, Heading } from "@chakra-ui/react";
import LabelRate from "../../components/label/rate/labelRate";
import TableRate from "../../components/table/rate";

export default function RatePage() {
  return (
    <Box>
      <Heading mb="16px" fontSize="12px" fontWeight="500" color="grey.500">
        Guests
      </Heading>
      <LabelRate />
      <TableRate />
    </Box>
  );
}
