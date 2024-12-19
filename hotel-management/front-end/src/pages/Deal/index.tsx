import { Box, Heading, useToast } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";

// Components
import {
  LabelDeal,
  Pagination,
  Spinner,
  Table,
  PageSizeSelector,
} from "@/components";

// Stores
import { useDealStore, useRateStore } from "@/stores";

// InterFace
import { DealData, NewDealData } from "@/interfaces";

// Constants
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PAGE_SIZE,
  EDIT_DEAL_MESSAGE,
} from "@/constants";

// Hooks
import {
  useCreateDeal,
  useDeleteDeal,
  useGetDeal,
  useGetRate,
  useUpdateDeal,
} from "@/hooks";

const DealPage = () => {
  const toast = useToast();
  const { isLoading: dealsLoading } = useDealStore();

  const { saveRate } = useRateStore();
  const { rates } = useGetRate({
    currentPage: DEFAULT_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const { isLoading: ratesLoading } = useRateStore();

  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [isAddDeal, setIsAddDeal] = useState(false);
  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);

  const { deals, pagination } = useGetDeal({ currentPage, pageSize });
  const { pageCount = 1 } = pagination || {};

  const createDeal = useCreateDeal();
  const updateDeal = useUpdateDeal();
  const deleteDeal = useDeleteDeal();

  const handleSelectedBedType = (_event: ChangeEvent<HTMLSelectElement>) => {};

  useEffect(() => {
    if (rates.length > 0) {
      setIsAddDeal(true);
      const bedTypeOptions = rates.map((item) => ({
        value: item.roomType,
        label: `${item.roomType} Bed`,
      }));
      saveRate(rates, bedTypeOptions);
    }
  }, [rates, saveRate]);

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(DEFAULT_CURRENT_PAGE);
  };

  const handleAddDeal = async (newDeal: NewDealData) => {
    createDeal.mutate(newDeal);
  };

  const handleDeleteDeal = async (deletedDealId: string) => {
    deleteDeal.mutate(deletedDealId);
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

    updateDeal.mutate({
      dealId: updatedDealData.documentId,
      requestPayload,
    });
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
      <Box display="flex" mt="40px">
        <PageSizeSelector
          onPageSizeChange={handlePageSizeChange}
          pageSize={pageSize}
        />
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          pageCount={pageCount}
        />
      </Box>
    </Box>
  );
};

export default DealPage;
