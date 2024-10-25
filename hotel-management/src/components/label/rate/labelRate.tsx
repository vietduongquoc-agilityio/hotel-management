import { Box } from "@chakra-ui/react";
import AddRateModal from "../../modal/rateModal/add/index";

export default function LabelRate() {
  return (
    <Box display="flex" justifyContent="flex-end" mb={4}>
      <AddRateModal text="Add room" type={"first"} bg="red"></AddRateModal>
    </Box>
  );
}
