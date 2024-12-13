import { Box, Heading, useToast } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";

// Components
import { LabelDeal, Pagination, Spinner, Table } from "@/components";

// Stores
import { useDealStore, useRateStore } from "@/stores";

// InterFace
import { DealData, NewDealData } from "@/interfaces";

// Constants
import { EDIT_DEAL_MESSAGE } from "@/constants";

const DealPage = () => {
  const toast = useToast();
  const {
    deals,
    fetchDeals,
    createDeal,
    deleteDeal,
    editDeal,
    isLoading: dealsLoading,
    pageCount,
  } = useDealStore();
  const { rates, isLoading: ratesLoading, fetchRates } = useRateStore();
  const pageSize = 10;
  const [isAddDeal, setIsAddDeal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const handleSelectedBedType = (_event: ChangeEvent<HTMLSelectElement>) => void 
  useEffect(() => {
    fetchRates(currentPage, pageSize);
    fetchDeals(currentPage, pageSize);
  }, [fetchDeals, currentPage]);

  useEffect(() => {
    if (rates.length > 0) {
      setIsAddDeal(true);
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
      title: EDIT_DEAL_MESSAGE.SUCCESS,
      description: EDIT_DEAL_MESSAGE.SUCCESS_DESCRIPTION,
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
        isAddDeal={isAddDeal}
        onAddDeal={handleAddDeal}
        handleSelectedBedType={handleSelectedBedType}
      />
      {dealsLoading || ratesLoading ? (
        <Spinner />
      ) : (
        <Table
          type="deal"
          onDelete={handleDeleteDeal}
          onEdit={handleEditDeal}
          data={deals}
        />
      )}

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        pageCount={pageCount}
      />
    </Box>
  );
};

export default DealPage;
