import { Box, Heading, useToast } from "@chakra-ui/react";
import { ChangeEvent, useEffect } from "react";

// Components
import { LabelGuest, Spinner, Table } from "@/components";

// InterFaces
import { GuestData, NewGuestData } from "@/interfaces";

//
import { useGuest } from "@/hooks/guest";

const GuestPage = () => {
  
  const { guests, isLoading, fetchGuests, updateGuest, createGuest } =
  useGuest();
  const toast = useToast();
  
  const  handleSelectedBedType = (_event: ChangeEvent<HTMLSelectElement>) => void

  useEffect(() => {
    fetchGuests(1, 10);
  }, [fetchGuests]);

  const handleAddRate = async (guestData: NewGuestData) => {
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

  const handleDeleteGuest = (deletedGuestId: string) => {
    deletedGuestId;
  };

  return (
    <Box>
      <Heading mb="16px" fontSize="12px" fontWeight="500" color="grey.500">
        Guest
      </Heading>
      <LabelGuest
        onAddGuest={handleAddRate}
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
