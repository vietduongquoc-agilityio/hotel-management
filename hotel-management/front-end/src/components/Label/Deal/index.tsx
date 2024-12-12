import { Box, ListItem, UnorderedList, Text } from "@chakra-ui/react";
import { ChangeEvent } from "react";

// Components
import { AddDealModal } from "@/components";

// InterFaces
import { NewDealData } from "@/interfaces";

export interface LabelDealProps {
  isAddRoom: boolean;
  onAddDeal: (roomData: NewDealData) => void;
  handleSelectedBedType: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const LabelDeal = ({ onAddDeal, handleSelectedBedType }: LabelDealProps) => {
  const closeModal = () => {};
  return (
    <Box
      cursor="pointer"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={4}
    >
      <UnorderedList styleType="none" m={0} display="flex" gap={4}>
        <ListItem>
          <Text
            border="1px solid rgb(152, 159, 173)"
            borderRadius="100px"
            p="8px 20px"
            _hover={{
              border: "1px solid rgb(21, 112, 239)",
              bg: "blue.100",
              color: "blue.500",
              transition: "background-color 0.2s ease",
            }}
          >
            Ongoing
          </Text>
        </ListItem>
        <ListItem>
          <Text
            border="1px solid rgb(152, 159, 173)"
            borderRadius="100px"
            p="8px 20px"
            _hover={{
              border: "1px solid rgb(21, 112, 239)",
              bg: "blue.100",
              color: "blue.500",
              transition: "background-color 0.2s ease",
            }}
          >
            Finished
          </Text>
        </ListItem>
      </UnorderedList>
      <>
        <AddDealModal
          onClose={closeModal}
          width={""}
          onAddDeal={onAddDeal}
          handleSelectedBedType={handleSelectedBedType}
        />
      </>
    </Box>
  );
};

export default LabelDeal;
