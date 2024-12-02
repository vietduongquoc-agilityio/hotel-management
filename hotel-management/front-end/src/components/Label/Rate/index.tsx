import { Box } from "@chakra-ui/react";

//InterFace
import { NewRateData } from "@/interfaces";

//Components
import { AddRateModal } from "@/components";

export interface LabelRateProps {
  onAddRate: (roomData: NewRateData) => void;
  width: string;
}
const LabelRate = ({ onAddRate, width = "" }: LabelRateProps) => {
  const closeModal = () => {};

  return (
    <Box width={width} display="flex" justifyContent="flex-end" mb={4}>
      <AddRateModal onAddRate={onAddRate} onClose={closeModal} />
    </Box>
  );
};

export default LabelRate;

