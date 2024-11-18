import { Box } from "@chakra-ui/react";

//InterFace
import { RateData } from "@/interfaces/Rate";

//Components
import AddRateModal from "@/components/Modal/RateModal/Add";

export interface LabelRateProps {
  onAddRate: (roomData: RateData) => void;
  width: string;
}

const LabelRate = ({ onAddRate, width = "" }: LabelRateProps) => {
  return (
    <Box width={width} display="flex" justifyContent="flex-end" mb={4}>
      <AddRateModal onAddRate={onAddRate} />
    </Box>
  );
};

export default LabelRate;
