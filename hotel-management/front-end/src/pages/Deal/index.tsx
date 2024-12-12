import { Box, Heading, useToast } from "@chakra-ui/react";
import { ChangeEvent, useEffect } from "react";

// Components
import { LabelDeal, Table } from "@/components";

// Stores
import { useDealStore } from "@/stores";

// InterFace
import { DealData, NewDealData } from "@/interfaces";

const DealPage = () => {
  const toast = useToast();
  const { deals, fetchDeals, createDeal, deleteDeal, editDeal } =
    useDealStore();

  const handleSelectedBedType = (_event: ChangeEvent<HTMLSelectElement>) =>
    void useEffect(() => {
      fetchDeals(1, 10);
    }, [fetchDeals]);

  const handleAddDeal = async (newDeal: NewDealData) => {
    await createDeal(newDeal);
  };

  const handleDeleteDeal = async (deletedDealId: string) => {
    await deleteDeal(deletedDealId);
  };

  const handleEditDeal = async (updatedDealData: DealData) => {
    const requestPayload = {
      roomType: updatedDealData.roomType,
      dealName: updatedDealData.dealName,
      startDate: updatedDealData.startDate,
      endDate: updatedDealData.endDate,
      statusDeal: updatedDealData.statusDeal,
      referenceNumber: updatedDealData.referenceNumber,
      reservationsLeft: updatedDealData.reservationsLeft,
    };

    await editDeal(updatedDealData.documentId, requestPayload);
    toast({
      title: "Rate updated",
      description: "Rate details have been successfully updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
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
        data={deals}
      />
    </Box>
  );
};

export default DealPage;
