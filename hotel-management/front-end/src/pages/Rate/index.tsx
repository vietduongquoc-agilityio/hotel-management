import { useEffect } from "react";
import { Box, Heading, useToast } from "@chakra-ui/react";

//InterFace
import { NewRateData, RateData } from "@/interfaces/Rate";

// Components
import LabelRate from "@/components/Label/Rate";
import TableRate from "@/components/Tables/Rate";
import Spinner from "@/components/Spinner";

// Store
import { useRateStore } from "@/store/RateStore";
import { useRoomStore } from "@/store/RoomStore";

const RatePage = () => {
  const toast = useToast();
  const totalOfBooked = useRoomStore((state) => state.totalOfBooked);

  // Zustand store for rates
  const { rates, loading, fetchRates, addRate, editRate, deleteRate } =
    useRateStore();

  useEffect(() => {
    fetchRates(1, 10);
  }, [fetchRates]);

  const handleAddRate = async (rateData: NewRateData) => {
    await addRate(rateData);
  };

  const handleEditRate = async (updatedRateData: RateData) => {
    const requestPayload = {
      roomType: updatedRateData.roomType,
      cancellationPolicy: updatedRateData.cancellationPolicy,
      availability: updatedRateData.availability,
      dealPrice: updatedRateData.dealPrice,
      deals: updatedRateData.deals,
      rate: updatedRateData.rate,
    };

    await editRate(updatedRateData.documentId, requestPayload);
    toast({
      title: "Rate updated",
      description: "Rate details have been successfully updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDeleteRate = (deletedRateId: string) => {
    deleteRate(deletedRateId);
  };

  return (
    <Box>
      <Heading mb="16px" fontSize="12px" fontWeight="500" color="grey.500">
        Rates
      </Heading>
      <LabelRate onAddRate={handleAddRate} />
      {loading ? (
        <Spinner />
      ) : (
        <TableRate
          onEditRate={handleEditRate}
          rates={rates}
          onDeleteRate={handleDeleteRate}
          totalOfBooked={totalOfBooked}
          bedType={""}
        />
      )}
    </Box>
  );
};

export default RatePage;
