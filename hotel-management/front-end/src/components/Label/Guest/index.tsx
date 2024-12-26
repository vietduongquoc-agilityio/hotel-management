import { ChangeEvent } from "react";
import { Box, Select } from "@chakra-ui/react";

// Components
import { AddGuestModal } from "@/components";

// InterFace
import { NewGuestData } from "@/interfaces";
import { useGuestStore } from "@/stores";

export interface LabelGuestProps {
  onAddGuest: (roomData: NewGuestData) => void;
  handleSelectedBedType: (event: ChangeEvent<HTMLSelectElement>) => void;
  isAddGuest: boolean;
  selectedGuestName: string;
  selectedStay: string;
  selectedPrice: string;
  handleSelectedGuestName: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleSelectedStay: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleSelectedPrice: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const LabelGuest = ({
  onAddGuest,
  handleSelectedBedType,
  isAddGuest,
  selectedGuestName,
  selectedStay,
  selectedPrice,
  handleSelectedGuestName,
  handleSelectedStay,
  handleSelectedPrice,
}: LabelGuestProps) => {
  const closeModal = () => {};
  const guestNameOptions = useGuestStore((state) => state.guestNameOptions);
  const stayOptions = useGuestStore((state) => state.stayOptions);
  const priceOptions = useGuestStore((state) => state.priceOptions);
  
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
            onChange={handleSelectedGuestName}
            value={selectedGuestName}
          >
            {guestNameOptions.map((option, index) => (
              <option key={`${option.value}-${index}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Select
            fontSize="13px"
            cursor="pointer"
            width="120px"
            placeholder="Filter Stay"
            onChange={handleSelectedStay}
            value={selectedStay} 
          >
            {stayOptions.map((option, index) => (
              <option key={`${option.value}-${index}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Select
            fontSize="13px"
            cursor="pointer"
            width="120px"
            placeholder="Filter Price"
            onChange={handleSelectedPrice}
            value={selectedPrice}
          >
            {priceOptions.map((option, index) => (
              <option key={`${option.value}-${index}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Box>
        <>
          <AddGuestModal
            onClose={closeModal}
            onAddGuest={onAddGuest}
            handleSelectedBedType={handleSelectedBedType}
            isDisabled={isAddGuest}
          />
        </>
      </Box>
    </>
  );
};

export default LabelGuest;
