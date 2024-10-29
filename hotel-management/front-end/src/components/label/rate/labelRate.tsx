import { Box } from "@chakra-ui/react";
import AddRateModal from "../../modal/rateModal/add/index";
import RateData from "../../interfaceTypes/rateTypes";

export default function LabelRate({
  onAddRate,
}: {
  onAddRate: (rateData: RateData) => void;
}) {
  return (
    <Box display="flex" justifyContent="flex-end" mb={4}>
      <AddRateModal onAddRate={onAddRate} />
    </Box>
  );
}