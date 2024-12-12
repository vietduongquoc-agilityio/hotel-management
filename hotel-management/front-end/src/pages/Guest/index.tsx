import { Box, Heading, useToast } from "@chakra-ui/react";
import { ChangeEvent, useEffect } from "react";

// Components
import { LabelGuest, Spinner, Table } from "@/components";

// InterFaces
import { GuestData, NewGuestData } from "@/interfaces";

// Stores
import { useGuestStore } from "@/stores";

const GuestPage = () => {
  const toast = useToast();
  const {
    isLoading,
    guests,
    fetchGuests,
    createGuest,
    updateGuest,
    deleteGuest,
  } = useGuestStore();
  const handleSelectedBedType = (_event: ChangeEvent<HTMLSelectElement>) =>
    void useEffect(() => {
      fetchGuests(1, 10);
    }, [fetchGuests]);

  const handleAddGuest = async (guestData: NewGuestData) => {
    await createGuest(guestData);
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

    await updateGuest(updatedGuestData.documentId, requestPayload);
    toast({
      title: "Guest updated",
      description: "Guest details have been successfully updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDeleteGuest = async (deletedGuestId: string) => {
    await deleteGuest(deletedGuestId);
  };

  return (
    <Box>
      <Heading mb="16px" fontSize="12px" fontWeight="500" color="grey.500">
        Guest
      </Heading>
      <LabelGuest
        onAddGuest={handleAddGuest}
        handleSelectedBedType={handleSelectedBedType}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <Table
          data={guests}
          type="guest"
          onDelete={handleDeleteGuest}
          onEdit={handleEditGuest}
        />
      )}
    </Box>
  );
};

export default GuestPage;
