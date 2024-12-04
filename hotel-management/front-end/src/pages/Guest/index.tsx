import { Box, Heading } from "@chakra-ui/react";

// Components
import { LabelGuest } from "@/components";

const GuestPage = () => {
  return (
    <Box>
      <Heading mb="16px" fontSize="12px" fontWeight="500" color="grey.500">
        Guest
      </Heading>

      <LabelGuest />
    </Box>
  );
};

export default GuestPage;
