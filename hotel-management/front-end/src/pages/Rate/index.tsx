import { useEffect } from "react";
import { Box, Heading, useToast } from "@chakra-ui/react";

// Components
import LabelRate from "@/components/Label/Rate";
import TableRate from "@/components/Tables/Rate";
import Spinner from "@/components/Spinner";

// Store
import { useRateStore } from "@/store/RateStore";
import { useRoomStore } from "@/store/RoomStore";
import { NewRateData, RateData } from "@/constant/InterfaceTypes/RateTypes";

const RatePage = () => {
  const toast = useToast();
  const totalOfBooked = useRoomStore((state) => state.totalOfBooked);

  // Zustand store for rates
  const { rates, loading, fetchRates, addRate, editRate, deleteRate } =
    useRateStore();

  useEffect(() => {
    fetchRates(1, 10);
  }, []);

  const handleAddRate = async (rateData: NewRateData) => {
    await addRate(rateData);
    toast({
      title: "Rate added",
      description: "Rate has been successfully added.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleEditRate = async (updatedRateData: RateData) => {
    await editRate(updatedRateData.documentId, updatedRateData);
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
    toast({
      title: "Rate deleted",
      description: "Rate has been successfully deleted.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
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
        />
      )}
    </Box>
  );
};

export default RatePage;
