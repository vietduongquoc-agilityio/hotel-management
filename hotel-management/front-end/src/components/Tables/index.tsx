import { Box, Text, UnorderedList, ListItem, Alert } from "@chakra-ui/react";
import { useEffect, useState } from "react";

// Interfaces
import { RoomData } from "@/interfaces/Room";
import { RateData } from "@/interfaces/Rate";

// Components
import EditRoomModal from "@/components/Modal/RoomModal/Edit";
import DeleteRoom from "@/components/Modal/RoomModal/Delete";
import EditRateModal from "@/components/Modal/RateModal/Edit";
import DeleteRate from "@/components/Modal/RateModal/Delete";
import Button from "@/components/Button";

// Constant
import {
  roomStatusBackgrounds,
  roomStatusColors,
} from "@/constant/SelectOptions";

export interface TableProps<T> {
  data: T[];
  type: "room" | "rate";
  error?: string | null;
  onDelete: (id: string) => void;
  onEdit: (updatedData: T) => void;
}

const Table = <T extends RoomData | RateData>({
  error,
  data,
  type,
  onDelete,
  onEdit,
}: TableProps<T>) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeId) {
        const menuElement = document.getElementById(`${activeId}`);
        if (menuElement && !menuElement.contains(event.target as Node)) {
          setActiveId(null);
        }
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [activeId]);

  const toggleMenu = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  if (error) return <Alert status="error">{error}</Alert>;
  if (data.length === 0)
    return (
      <Alert
        fontWeight="500"
        color="grey.800"
        borderRadius="10px"
        status="info"
      >
        No {type}s available.
      </Alert>
    );

  const renderRow = (item: RoomData | RateData) => {
    if (type === "room") {
      const room = item as RoomData;
      return (
        <>
          <Text w="15%" color="grey.900" fontWeight="500">
            {room.roomNumber}
          </Text>
          <Text w="20%">{room.bedType} Bed</Text>
          <Text w="15%">{room.roomFloor} Floor</Text>
          <Text w="27%">{room.roomFacility}</Text>
          <Box w="16%" justifyContent="center" display="flex">
            <Text
              borderRadius="16px"
              p="4px 8px"
              w="65px"
              mr="15px"
              bg={roomStatusBackgrounds[room.roomStatus]}
              display="flex"
              justifyContent="center"
              color={roomStatusColors[room.roomStatus]}
              fontSize="12px"
            >
              {room.roomStatus}
            </Text>
          </Box>
        </>
      );
    } else if (type === "rate") {
      const rate = item as RateData;
      const availability = rate.totalOfRooms - rate.totalOfBooked;
      const isFull = availability === 0;
      const textColor = isFull ? "red.500" : "blue.500";
      const backgroundColor = isFull ? "red.100" : "blue.100";

      return (
        <>
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
        </>
      );
    }
    return null;
  };

  const tableHeaders =
    type === "room"
      ? [
          { label: "Room number", width: "15%" },
          { label: "Bed type", width: "20%" },
          { label: "Room floor", width: "15%" },
          { label: "Room facility", width: "32%" },
          { label: "Status", width: "16%" },
        ]
      : [
          { label: "Room type", width: "15%" },
          { label: "Deals", width: "15%" },
          { label: "Cancellation policy", width: "15%" },
          { label: "Deal price", width: "15%" },
          { label: "Rate", width: "15%" },
          { label: "Availability", width: "26%" },
        ];

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
        {tableHeaders.map((header, index) => (
          <ListItem key={index} w={header.width} listStyleType="none">
            {header.label}
          </ListItem>
        ))}
      </UnorderedList>
      {data.map((item) => {
        return (
          <Box
            key={item.documentId}
            fontSize="14px"
            fontWeight="400"
            display="flex"
            maxW="1020px"
            w="100%"
            p="17px 24px"
            position="relative"
            border="1px solid #d4e5fa"
          >
            {renderRow(item)}

            <Button
              bg="white.200"
              color="grey.800"
              _hover={{ bg: "white.200" }}
              height="15px"
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu(item.documentId);
              }}
              text={"⋮"}
              buttonType={"primary"}
            />
            {activeId === item.documentId && (
              <Box
                id={item.documentId}
                top="25px"
                right="70px"
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
                {type === "room" ? (
                  <>
                    <EditRoomModal
                      initialRoomData={item as RoomData}
                      onEditRoom={(item: RoomData) => {
                        onEdit(item as T);
                      }}
                    />
                    <DeleteRoom
                      roomId={item.documentId}
                      onDeleteRoom={onDelete}
                    />
                  </>
                ) : (
                  <>
                    <EditRateModal
                      initialRateData={item as RateData}
                      onEditRate={(item: RateData) => {
                        onEdit(item as T);
                      }}
                    />
                    <DeleteRate
                      rateId={item.documentId}
                      onDeleteRate={onDelete}
                    />
                  </>
                )}
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default Table;
