import { useState, useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import LabelRate from "../../components/label/rate/labelRate";
import TableRate from "../../components/table/rate";
import { getRates } from "../../services/rateServices";
import RateData from "../../components/interfaceTypes/rateTypes";

const RatePage = () => {
  const [rates, setRates] = useState<RateData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const data = await getRates(1, 10);
      setRates(data.data);
    } catch (error) {
      console.error("Error fetching rates:", error);
    } finally {
      setLoading(false);
    }
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
      <TableRate rates={rates} loading={loading} />
    </Box>
  );
};

export default RatePage;
