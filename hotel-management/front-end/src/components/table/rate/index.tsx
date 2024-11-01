import { useState } from "react";
import { Box, Text, UnorderedList, ListItem, Alert } from "@chakra-ui/react";
import RateData from "../../constants/interfaceTypes/rateTypes";
import EditRateModal from "../../modal/rateModal/edit";
import DeleteRate from "../../modal/rateModal/delete";
import Button from "../../button";

interface TableRateProps {
  rates: RateData[];
  error?: string | null;
  onDeleteRate: (rateId: string) => void;
  onEditRate: (updatedRateData: RateData) => Promise<void>;
}

const TableRate = ({
  rates,
  error,
  onDeleteRate,
  onEditRate,
}: TableRateProps) => {
  const [activeRateId, setActiveRateId] = useState<string | null>(null);
  const [selectedRate, setSelectedRate] = useState<RateData | null>(null);

  const toggleMenu = (rateId: string) => {
    setActiveRateId((prev) => (prev === rateId ? null : rateId));
  };

  const handleEditRate = (rate: RateData) => {
    setSelectedRate(rate);
  };

  if (error) return <Alert status="error">{error}</Alert>;
  if (rates.length === 0)
    return <Alert status="info">No rates available.</Alert>;

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
          key={rate.documentId}
          fontSize="14px"
          fontWeight="400"
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
          <Text w="15%">{rate.dealPrice}$</Text>
          <Text w="15%">{rate.rate}$</Text>
          <Text w="20%">{rate.availability}</Text>
          <Button
            bg="white.200"
            color="grey.800"
            _hover={{ bg: "white.200" }}
            height="15px"
            onClick={() => toggleMenu(rate.documentId)}
            text={"⋮"}
            buttonType={"first"}
          />
          {activeRateId === rate.documentId && (
            <Box
              top="25px"
              right="55px"
              position="absolute"
              backgroundColor="white.200"
              border="1px solid #989fad"
              p="7px"
              boxShadow="0px 4px 8px rgba(57, 56, 56, 0.466)"
              display="flex"
              flexDirection="column"
              gap="10px"
              zIndex="100"
              borderRadius="8px"
              w="80px"
            >
              <Button
                onClick={() => handleEditRate(rate)}
                text="Edit"
                buttonType={"first"}
              ></Button>
              {selectedRate && (
                <EditRateModal
                  initialRateData={selectedRate}
                  onClose={() => setSelectedRate(null)}
                  onEditRate={onEditRate}
                />
              )}
              <DeleteRate
                rateId={rate.documentId}
                onDeleteRate={onDeleteRate}
              />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default TableRate;
