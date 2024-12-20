import { useState } from "react";
import { Box, Heading, useToast } from "@chakra-ui/react";

// Interfaces
import { NewRateData, RateData } from "@/interfaces";

// Components
import {
  LabelRate,
  Table,
  Spinner,
  PageSizeSelector,
  Pagination,
} from "@/components";

// Store
import { useRateStore } from "@/stores";

// Hooks
import {
  useCreateRate,
  useDeleteRate,
  useGetRate,
  useUpdateRate,
} from "@/hooks";

// Constants
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_PAGE_SIZE,
  EDIT_RATE_MESSAGE,
} from "@/constants";

const RatePage = () => {
  const toast = useToast();

  // Zustand store for rates
  const { isLoading: ratesLoading } = useRateStore();

  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { rates, pagination } = useGetRate({
    currentPage,
    pageSize,
  });

  const { pageCount = 1 } = pagination || {};
  const addRate = useCreateRate();
  const editRate = useUpdateRate();
  const deleteRate = useDeleteRate();

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(DEFAULT_CURRENT_PAGE);
  };

  const handleAddRate = async (rateData: NewRateData) => {
    addRate.mutate(rateData);
  };

  const handleEditRate = async (updatedRateData: RateData) => {
    const requestPayload = {
      roomType: updatedRateData.roomType,
      cancellationPolicy: updatedRateData.cancellationPolicy,
      dealPrice: updatedRateData.dealPrice,
      deals: updatedRateData.deals,
      rate: updatedRateData.rate,
      totalOfRooms: updatedRateData.totalOfRooms,
      totalOfBooked: updatedRateData.totalOfBooked,
    };

    editRate.mutate({ rateId: updatedRateData.documentId, requestPayload });
    toast({
      title: EDIT_RATE_MESSAGE.SUCCESS,
      description: EDIT_RATE_MESSAGE.SUCCESS_DESCRIPTION,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDeleteRate = async (rateId: string) => {
    deleteRate.mutate(rateId);
  };

  return (
    <Box>
      <Heading mb="16px" fontSize="12px" fontWeight="500" color="grey.500">
        Rates
      </Heading>
      <LabelRate onAddRate={handleAddRate} width={""} />
      {ratesLoading ? (
        <Spinner />
      ) : (
        <Table
          data={rates}
          type="rate"
          onDelete={handleDeleteRate}
          onEdit={handleEditRate}
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

export default RatePage;
