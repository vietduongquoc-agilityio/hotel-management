import { useState, useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import LabelRate from "../../components/label/rate/labelRate";
import TableRate from "../../components/table/rate";
import { getRates } from "../../services/rateServices";
import RateData from "../../components/interfaceTypes/rateTypes";

export default function RatePage() {
  const [rates, setRates] = useState<RateData[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchRates = async () => {
    try {
      const data = await getRates(1, 10, "roomType:ASC");
      setRates(data.data);
    } catch (error) {
      console.error("Error fetching rates:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("rates", rates);
  

  useEffect(() => {
    fetchRates();
  }, []);

  const handleAddRate = () => {
    fetchRates();
  };

  return (
    <Box>
      <Heading mb="16px" fontSize="12px" fontWeight="500" color="grey.500">
        Rates
      </Heading>
      <LabelRate onAddRate={handleAddRate} />
      <TableRate rates={rates} loading={loading} />
    </Box>
  );
}
