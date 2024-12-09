import { Box, Heading } from "@chakra-ui/react";
import { ChangeEvent, useEffect } from "react";

// Components
import { LabelDeal, Table } from "@/components";

const DealPage = () => {
  const handleSelectedBedType = (_event: ChangeEvent<HTMLSelectElement>) => void
 
  useEffect (() => {

  }, []);

  const handleAddDeal = async () => {
    await console.log("handleEditDeal", handleEditDeal);
  };

  const handleEditDeal = async () => {
    await console.log("handleEditDeal", handleEditDeal);
  };

  const handleDeleteDeal = async () => {
    await console.log("handleDeleteDeal", handleDeleteDeal);
  };

  return (
    <Box>
      <Heading mb="16px" fontSize="12px" fontWeight="500" color="grey.500">
        Deal
      </Heading>

      <LabelDeal
        onAddDeal={handleAddDeal}
        handleSelectedBedType={handleSelectedBedType}
      />

      <Table
        type="deal"
        onDelete={handleDeleteDeal}
        onEdit={handleEditDeal}
        data={[]}
      />
    </Box>
  );
};

export default DealPage;
