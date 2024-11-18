import { Box, Text, UnorderedList, ListItem, Alert } from "@chakra-ui/react";
import { useEffect, useState } from "react";

// InterFace
import { RoomData } from "@/interfaces/Room";

// Components
import EditRoomModal from "@/components/Modal/RoomModal/Edit";
import DeleteRoom from "@/components/Modal/RoomModal/Delete";
import Button from "@/components/Button";
import {
  roomStatusBackgrounds,
  roomStatusColors,
} from "@/constant/SelectOptions";

export interface TableRoomProps {
  rooms: RoomData[];
  error?: string | null;
  onDeleteRoom: (roomId: string) => void;
  onEditRoom: (roomData: RoomData) => void;
}

const TableRoom = ({
  rooms,
  error,
  onDeleteRoom,
  onEditRoom,
}: TableRoomProps) => {
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeRoomId) {
        const menuElement = document.getElementById(`${activeRoomId}`);
        if (menuElement && !menuElement.contains(event.target as Node)) {
          setActiveRoomId(null);
        }
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [activeRoomId]);

  const toggleMenu = (roomId: string) => {
    setActiveRoomId((prev) => (prev === roomId ? null : roomId));
  };

  if (error) return <Alert status="error">{error}</Alert>;
  if (rooms.length === 0)
    return (
      <Alert
        fontWeight="500"
        mb="50px"
        mt="20px"
        color="grey.800"
        borderRadius="10px"
        status="info"
      >
        No rooms booked
      </Alert>
    );

  return (
    <Box
      borderTopLeftRadius="8px"
      borderTopRightRadius="8px"
      mt="17px"
      mb="17px"
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
        <ListItem w="15%" listStyleType="none">
          Room number
        </ListItem>
        <ListItem w="20%" listStyleType="none">
          Bed type
        </ListItem>
        <ListItem w="15%" listStyleType="none">
          Room floor
        </ListItem>
        <ListItem w="32%" listStyleType="none">
          Room facility
        </ListItem>
        <ListItem w="16%" listStyleType="none">
          Status
        </ListItem>
      </UnorderedList>
      {rooms.map((room) => (
        <Box
          key={room.documentId}
          fontSize="14px"
          fontWeight="400"
          display="flex"
          maxW="1020px"
          w="100%"
          p="17px 24px"
          position="relative"
          border="1px solid #d4e5fa"
        >
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

          <Button
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu(room.documentId);
            }}
            bg="white.200"
            color="grey.800"
            _hover={{ bg: "white.200" }}
            height="15px"
            text={"⋮"}
            buttonType={"first"}
          />
          {activeRoomId === room.documentId && (
            <Box
              id={room.documentId}
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
              <EditRoomModal
                initialRoomData={room}
                onEditRoom={(updatedRoomData: RoomData) => {
                  onEditRoom(updatedRoomData);
                  setActiveRoomId(null);
                }}
              />
              <DeleteRoom
                roomId={room.documentId}
                onDeleteRoom={onDeleteRoom}
              />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default TableRoom;
