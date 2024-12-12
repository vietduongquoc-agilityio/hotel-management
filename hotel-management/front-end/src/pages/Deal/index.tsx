import { Box, Heading, useToast } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";

// Components
import { LabelDeal, Spinner, Table } from "@/components";

// Stores
import { useDealStore, useRateStore } from "@/stores";

// InterFace
import { DealData, NewDealData } from "@/interfaces";

const DealPage = () => {
  const toast = useToast();
  const {
    deals,
    fetchDeals,
    createDeal,
    deleteDeal,
    editDeal,
    isLoading: guestsLoading,
  } = useDealStore();
  const { rates, isLoading: ratesLoading, fetchRates } = useRateStore();
  const pageSize = 10;
  const [isAddRoom, setIsAddRoom] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const handleSelectedBedType = (_event: ChangeEvent<HTMLSelectElement>) => void 
  
  useEffect(() => {
    fetchRates(currentPage, pageSize);
  }, []);

  useEffect(() => {
    fetchDeals(currentPage, pageSize);
  }, [fetchDeals, currentPage]);

  useEffect(() => {
    if (rates.length > 0) {
      setIsAddRoom(true);
    }
  }, [rates]);

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
        isAddRoom={isAddRoom}
        onAddDeal={handleAddDeal}
        handleSelectedBedType={handleSelectedBedType}
      />
      {guestsLoading || ratesLoading ? (
        <Spinner />
      ) : (
        <Table
          type="deal"
          onDelete={handleDeleteDeal}
          onEdit={handleEditDeal}
          data={deals}
        />
      )}
    </Box>
  );
};

export default DealPage;
