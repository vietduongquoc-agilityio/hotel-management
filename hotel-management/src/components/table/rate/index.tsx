/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
  Box,
  Text,
  UnorderedList,
  ListItem,
  Button,
  Spinner,
  Alert,
} from "@chakra-ui/react";
import { getRates } from "../../../services/rateServices";
import EditRate from "../../modal/rateModal/edit";
import DeleteRate from "../../modal/rateModal/delete";

interface RateData {
  id: string;
  roomType: string;
  cancellationPolicy: string;
  deals: string;
  dealPrice: string;
  rate: string;
  availability: string;
  rateNumber: string;
}

export default function TableRate() {
  const [rates, setRates] = useState<RateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRate, setSelectedRate] = useState<RateData | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [activeRateId, setActiveRateId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRateData = async () => {
      try {
        const data = await getRates(1, 10, "roomType:ASC");
        if (data && Array.isArray(data.data)) {
          setRates(data.data);
        } else {
          setError("Unexpected data format");
        }
      } catch (error) {
        setError("Failed to fetch rate data");
      } finally {
        setLoading(false);
      }
    };
    fetchRateData();
  }, []);

  const handleEdit = (rate: RateData) => {
    setSelectedRate(rate);
    setIsEditOpen(true);
    setActiveRateId(null);
  };

  const handleDelete = (rate: RateData) => {
    setSelectedRate(rate);
    setIsDeleteOpen(true);
    setActiveRateId(null);
  };

  const toggleMenu = (rateId: string) => {
    setActiveRateId((prev) => (prev === rateId ? null : rateId));
  };

  if (loading) return <Spinner />;
  if (error) return <Alert status="error">{error}</Alert>;

  return (
    <Box>
      <UnorderedList>
        <ListItem>Room type</ListItem>
        <ListItem>Deals</ListItem>
        <ListItem>Cancellation policy</ListItem>
        <ListItem>Deal price</ListItem>
        <ListItem>Rate</ListItem>
        <ListItem>Availability</ListItem>
      </UnorderedList>
      {rates.map((rate) => (
        <Box key={rate.id}>
          <Text>{rate.roomType}</Text>
          <Text>{rate.deals}</Text>
          <Text>{rate.cancellationPolicy}</Text>
          <Text>{rate.dealPrice}</Text>
          <Text>{rate.rate}</Text>
          <Text>{rate.availability}</Text>
          <Button onClick={() => toggleMenu(rate.id)}>⋮</Button>
          {activeRateId === rate.id && (
            <Box>
              <Button onClick={() => handleEdit(rate)}>Edit</Button>
              <Button onClick={() => handleDelete(rate)}>Delete</Button>
            </Box>
          )}
        </Box>
      ))}

      {isEditOpen && selectedRate && (
        <EditRate rate={selectedRate} onClose={() => setIsEditOpen(false)} />
      )}
      {isDeleteOpen && selectedRate && (
        <DeleteRate
          rate={selectedRate}
          onClose={() => setIsDeleteOpen(false)}
        />
      )}
    </Box>
  );
}
