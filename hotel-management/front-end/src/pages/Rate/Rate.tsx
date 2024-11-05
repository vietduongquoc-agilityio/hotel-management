/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Box, Heading, useToast } from "@chakra-ui/react";

//Constants
import { RateData, NewRateData } from "@/constant/InterfaceTypes/RateTypes";

//Components
import LabelRate from "@/components/Label/Rate/LabelRate";
import TableRate from "@/components/Tables/Rate/Rate";
import Spinner from "@/components/Spinner/Spinner";

//Services
import { getRates, updateRate, createRateApi } from "@/services/rateServices";

const RatePage = () => {
  const [rates, setRates] = useState<RateData[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchRates = async () => {
    setLoading(true);
    try {
      const data = await getRates(1, 10);
      setRates(data.data);
    } catch (error) {
      toast({
        title: "Error fetching rates",
        description: "There was an issue retrieving the rate data.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error fetching rates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRate = async (rateData: NewRateData) => {
    try {
      const { data } = await createRateApi(rateData);
      const listRate = rates.slice(0, -1);
      setRates([data, ...listRate]);
    } catch (error) {
      console.log("Error handleAddRate", error);
    }
  };

  const handleEditRate = async (updatedRateData: RateData) => {
    try {
      const requestData = {
        roomType: updatedRateData.roomType,
        cancellationPolicy: updatedRateData.cancellationPolicy,
        availability: updatedRateData.availability,
        dealPrice: updatedRateData.dealPrice,
        deals: updatedRateData.deals,
        rate: updatedRateData.rate,
      };
      await updateRate(updatedRateData.documentId, requestData);
      setRates((prevRates) =>
        prevRates.map((rate) =>
          rate.documentId === updatedRateData.documentId
            ? updatedRateData
            : rate
        )
      );
      toast({
        title: "Rate updated",
        description: "Rate details have been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error updating room",
        description: "There was an issue updating the room data.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error updating rate:", error);
    }
  };

  const handleDeleteRate = (deletedRateId: string) => {
    setRates((prevRates) =>
      prevRates.filter((rate) => rate.documentId !== deletedRateId)
    );
  };

  useEffect(() => {
    fetchRates();
  }, []);

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
        />
      )}
    </Box>
  );
};

export default RatePage;
