import { Box, Heading } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";

// Components
import {
  LabelGuest,
  PageSizeSelector,
  Pagination,
  Spinner,
  Table,
} from "@/components";

// InterFaces
import { GuestData, NewGuestData } from "@/interfaces";

// Stores
import { useGuestStore, useRateStore } from "@/stores";

// Hooks
import {
  useCreateGuest,
  useUpdateGuest,
  useDeleteGuest,
  useGetGuest,
  useGetRate,
} from "@/hooks";

const GuestPage = () => {
  const { saveRate } = useRateStore();
  const { data: ratesData } = useGetRate();
  const { isLoading: guestsLoading } = useGuestStore();

  const handleSelectedBedType = (_event: ChangeEvent<HTMLSelectElement>) => {};

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isAddGuest, setIsAddGuest] = useState(false);
  
  const getGuest = useGetGuest({currentPage, pageSize})
  const createGuest = useCreateGuest();
  const updateGuest = useUpdateGuest();
  const deleteGuest = useDeleteGuest();

  const { guests, pagination } = useGetGuest({ currentPage, pageSize });

  const { pageCount = 1 } = pagination || {};

  useEffect(() => {
    getGuest;
  }, [getGuest]);

  useEffect(() => {
    if (ratesData?.rates.length > 0) {
      setIsAddGuest(true);
      const { rates, bedTypeOptions } = ratesData || {};
      saveRate(rates, bedTypeOptions);
    }
  }, [ratesData, saveRate]);

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handleAddGuest = async (guestData: NewGuestData) => {
    createGuest.mutate(guestData);
    console.log("guestData", guestData);
  };

  const handleEditGuest = async (updatedGuestData: GuestData) => {
    const requestPayload = {
      roomType: updatedGuestData.roomType,
      guestName: updatedGuestData.guestName,
      stay: updatedGuestData.stay,
      price: updatedGuestData.price,
      checkInDate: updatedGuestData.checkInDate,
      registrationNumber: updatedGuestData.registrationNumber,
      totalAmount: updatedGuestData.totalAmount,
    };

    updateGuest.mutate({
      guestId: updatedGuestData.documentId,
      requestPayload: requestPayload,
    });
  };

  const handleDeleteGuest = async (deletedGuestId: string) => {
    deleteGuest.mutate(deletedGuestId);
  };
  console.log("Rendered guests:", guests);

  return (
    <Box>
      <Heading mb="16px" fontSize="12px" fontWeight="500" color="grey.500">
        Guest
      </Heading>
      <LabelGuest
        onAddGuest={handleAddGuest}
        handleSelectedBedType={handleSelectedBedType}
        isAddGuest={isAddGuest}
      />

      {guestsLoading ? (
        <Spinner />
      ) : (
        <Table
          data={guests}
          type="guest"
          onDelete={handleDeleteGuest}
          onEdit={handleEditGuest}
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

export default GuestPage;
