import { Box, Heading } from "@chakra-ui/react";
import LabelRate from "../../components/label/labelRate";
import TableRate from "../../components/table/rate";

export default function RatePage() {
  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <Box>
      <Heading as="h1" mb={4}>
        Guests
      </Heading>
      <LabelRate handleClick={handleClick} />
      <TableRate />
    </Box>
  );
}
