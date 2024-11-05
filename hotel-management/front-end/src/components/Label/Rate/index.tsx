import { Box } from "@chakra-ui/react";

//Constants
import { RateData } from "@/constant/InterfaceTypes/RateTypes";

//Components
import AddRateModal from "@/components/Modal/RateModal/Add";

interface LabelRateProps {
  onAddRate: (roomData: RateData) => void;
}

const LabelRate = ({ onAddRate }: LabelRateProps) => {
  return (
    <Box display="flex" justifyContent="flex-end" mb={4}>
      <AddRateModal onAddRate={onAddRate} />
    </Box>
  );
};

export default LabelRate;
