import { useState, useEffect } from "react";
import { Box, Heading, useToast } from "@chakra-ui/react";
import LabelRate from "../../components/label/rate/labelRate";
import TableRate from "../../components/table/rate";
import { getRates } from "../../services/rateServices";
import RateData from "../../components/constants/interfaceTypes/rateTypes";
import Spinner from "../../components/spinner";

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

  const handleEditRate = async (updatedRateData: RateData) => {
    setRates((prevRates) =>
      prevRates.map((rate) =>
        rate.documentId === updatedRateData.documentId ? updatedRateData : rate
      )
    );
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
      <LabelRate onAddRate={fetchRates} />
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
