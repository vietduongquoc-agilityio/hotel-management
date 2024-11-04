import { Box } from "@chakra-ui/react";

//Constants
import {RateData} from "@/Constants/InterfaceTypes/RateTypes";

//Components
import AddRateModal from "@/components/Modal/RateModal/Add/AddRate";

const LabelRate = ({
  onAddRate,
}: {
  onAddRate: (rateData: RateData) => void;
}) => {
  return (
    <Box display="flex" justifyContent="flex-end" mb={4}>
      <AddRateModal onAddRate={onAddRate} />
    </Box>
  );
};

export default LabelRate;
