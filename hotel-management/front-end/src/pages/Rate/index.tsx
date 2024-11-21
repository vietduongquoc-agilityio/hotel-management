import { useEffect } from "react";
import { Box, Heading, useToast } from "@chakra-ui/react";

// InterFace
import { NewRateData, RateData } from "@/interfaces";

// Components
import { LabelRate, Table, Spinner } from "@/components";

// Store
import { useRateStore } from "@/store/RateStore";

const RatePage = () => {
  const toast = useToast();

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
      dealPrice: updatedRateData.dealPrice,
      deals: updatedRateData.deals,
      rate: updatedRateData.rate,
      totalOfRooms: updatedRateData.totalOfRooms,
      totalOfBooked: updatedRateData.totalOfBooked,
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
      <LabelRate onAddRate={handleAddRate} width={""} />
      {loading ? (
        <Spinner />
      ) : (
        <Table
          data={rates}
          type="rate"
          onDelete={handleDeleteRate}
          onEdit={handleEditRate}
        />
      )}
    </Box>
  );
};

export default RatePage;
