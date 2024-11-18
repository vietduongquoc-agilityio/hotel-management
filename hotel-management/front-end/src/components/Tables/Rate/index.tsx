import { Box, Text, UnorderedList, ListItem, Alert } from "@chakra-ui/react";
import { useEffect, useState } from "react";

// InterFace
import { RateData } from "@/interfaces/Rate";

//Components
import EditRateModal from "@/components/Modal/RateModal/Edit";
import DeleteRate from "@/components/Modal/RateModal/Delete";
import Button from "@/components/Button";

export interface TableRateProps {
  rates: RateData[];
  error?: string | null;
  onDeleteRate: (rateId: string) => void;
  onEditRate: (updatedRateData: RateData) => void;
}

const TableRate = ({
  rates,
  error,
  onDeleteRate,
  onEditRate,
}: TableRateProps) => {
  const [activeRateId, setActiveRateId] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeRateId) {
        const menuElement = document.getElementById(`${activeRateId}`);
        if (menuElement && !menuElement.contains(event.target as Node)) {
          setActiveRateId(null);
        }
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [activeRateId]);

  const toggleMenu = (rateId: string) => {
    setActiveRateId((prev) => (prev === rateId ? null : rateId));
  };

  if (error) return <Alert status="error">{error}</Alert>;
  if (rates.length === 0)
    return (
      <Alert
        fontWeight="500"
        color="grey.800"
        borderRadius="10px"
        status="info"
      >
        No rates available.
      </Alert>
    );

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
      {rates.map((rate) => {
        const { totalOfRooms, totalOfBooked } = rate;

        const availability = totalOfRooms - totalOfBooked;
        const isFull = availability === 0;
        const textColor = isFull ? "red.500" : "blue.500";
        const backgroundColor = isFull ? "red.100" : "blue.100";

        return (
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
            <Text fontWeight="500" w="15%" color="grey.900">
              {rate.dealPrice}$
            </Text>
            <Box w="20%">
              <Text
                borderRadius="16px"
                p="2px 4px"
                w="65px"
                color={textColor}
                bg={backgroundColor}
                display="flex"
                justifyContent="center"
              >
                {isFull ? "Full" : availability}
              </Text>
            </Box>

            <Button
              bg="white.200"
              color="grey.800"
              _hover={{ bg: "white.200" }}
              height="15px"
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu(rate.documentId);
              }}
              text={"⋮"}
              buttonType={"first"}
            />
            {activeRateId === rate.documentId && (
              <Box
                id={rate.documentId}
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
                <EditRateModal
                  initialRateData={rate}
                  onEditRate={(updatedRateData: RateData) => {
                    onEditRate(updatedRateData);
                  }}
                />
                <DeleteRate
                  rateId={rate.documentId}
                  onDeleteRate={onDeleteRate}
                />
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default TableRate;
