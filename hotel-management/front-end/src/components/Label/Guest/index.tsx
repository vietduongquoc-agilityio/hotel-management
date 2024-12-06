import { ChangeEvent } from "react";
import { Box, Select } from "@chakra-ui/react";

// Components
import { AddGuestModal } from "@/components";

// InterFace
import { NewGuestData } from "@/interfaces";

export interface LabelGuestProps {
  onAddGuest: (roomData: NewGuestData) => void;
  handleSelectedBedType: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const LabelGuest = ({ onAddGuest, handleSelectedBedType }: LabelGuestProps) => {
  const closeModal = () => {};

  return (
    <>
      <Box
        cursor="pointer"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        width="100%"
      >
        <Box display="flex" gap="10px">
          <Select
            fontSize="13px"
            cursor="pointer"
            width="120px"
            placeholder="Filter Name"
          ></Select>
          <Select
            fontSize="13px"
            cursor="pointer"
            width="120px"
            placeholder="Filter Stay"
          ></Select>
          <Select
            fontSize="13px"
            cursor="pointer"
            width="120px"
            placeholder="Filter Price"
          ></Select>
        </Box>
        <>
          <AddGuestModal
            onClose={closeModal}
            onAddRate={onAddGuest}
            handleSelectedBedType={handleSelectedBedType}
          />
        </>
      </Box>
    </>
  );
};

export default LabelGuest;
