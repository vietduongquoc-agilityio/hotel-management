/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Text,
  UnorderedList,
  ListItem,
  Spinner,
  Alert,
} from "@chakra-ui/react";
import { getRates } from "../../../services/rateServices";
import EditRate from "../../modal/rateModal/edit";
import DeleteRate from "../../modal/rateModal/delete";
import Button from "../../button";

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
  const [activeRateId, setActiveRateId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveRateId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const toggleMenu = (rateId: string) => {
    setActiveRateId((prev) => (prev === rateId ? null : rateId));
  };

  if (loading) return <Spinner />;
  if (error) return <Alert status="error">{error}</Alert>;

  return (
    <Box
      borderTopLeftRadius="8px"
      borderTopRightRadius="8px"
      border="1px solid #d4e5fa"
    >
      <UnorderedList
        display="flex"
        maxW="1020px"
        w="100%"
        m="0"
        bg="grey.50"
        fontSize="12px"
        fontWeight="500"
        color="grey.500"
        borderTopLeftRadius="8px"
        borderTopRightRadius="8px"
        p="10px 24px"
      >
        <ListItem listStyleType="none" w="15%">
          Room type
        </ListItem>
        <ListItem listStyleType="none" w="15%">
          Deals
        </ListItem>
        <ListItem listStyleType="none" w="15%">
          Cancellation policy
        </ListItem>
        <ListItem listStyleType="none" w="15%">
          Deal price
        </ListItem>
        <ListItem listStyleType="none" w="15%">
          Rate
        </ListItem>
        <ListItem listStyleType="none" w="26%">
          Availability
        </ListItem>
      </UnorderedList>
      {rates.map((rate) => (
        <Box
          fontSize="14px"
          fontWeight="400"
          key={rate.id}
          display="flex"
          maxW="1020px"
          w="100%"
          p="17px 24px"
          position="relative"
          border="1px solid #d4e5fa"
        >
          <Text w="15%" color="grey.900">
            {rate.roomType}
          </Text>
          <Text w="15%">{rate.deals}</Text>
          <Text w="15%">{rate.cancellationPolicy}</Text>
          <Text w="15%">{rate.dealPrice}</Text>
          <Text w="15%">{rate.rate}</Text>
          <Text w="20%">{rate.availability}</Text>
          <Button
            bg="white.200"
            color="grey.800"
            _hover={{ bg: "white.200" }}
            height="15px"
            onClick={() => toggleMenu(rate.id)}
            text={" ⋮"}
            buttonType={"first"}
          />
          {activeRateId === rate.id && (
            <Box
              ref={menuRef}
              top="25px"
              right="55px"
              position="absolute"
              background-color="white.200"
              border=" 1px solid #989fad"
              p="7px"
              boxShadow="0px 4px 8px rgba(57, 56, 56, 0.466)"
              display="flex"
              flexDirection="column"
              gap="10px"
              zIndex="100"
              borderRadius="8px"
              w="80px"
            >
              <EditRate></EditRate>
              <DeleteRate></DeleteRate>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
