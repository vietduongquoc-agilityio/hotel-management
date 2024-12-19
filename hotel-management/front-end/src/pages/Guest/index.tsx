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

// Constants
import { DEFAULT_CURRENT_PAGE, DEFAULT_PAGE_SIZE } from "@/constants";

const GuestPage = () => {
  const { saveRate } = useRateStore();
  const { rates } = useGetRate({
    currentPage: DEFAULT_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
  });
  const { isLoading: guestsLoading } = useGuestStore();

  const handleSelectedBedType = (_event: ChangeEvent<HTMLSelectElement>) => {};

  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [isAddGuest, setIsAddGuest] = useState(false);

  const createGuest = useCreateGuest();
  const updateGuest = useUpdateGuest();
  const deleteGuest = useDeleteGuest();

  const { guests, pagination } = useGetGuest({ currentPage, pageSize });
  const { pageCount = 1 } = pagination || {};

  useEffect(() => {
    if (rates.length > 0) {
      setIsAddGuest(true);
      const bedTypeOptions = rates.map((item) => ({
        value: item.roomType,
        label: `${item.roomType} Bed`,
      }));
      saveRate(rates, bedTypeOptions);
    } else {
      setIsAddGuest(false);
    }
  }, [rates, saveRate]);

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(DEFAULT_CURRENT_PAGE);
  };

  const handleAddGuest = async (guestData: NewGuestData) => {
    createGuest.mutate(guestData);
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
