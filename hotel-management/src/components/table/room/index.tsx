/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import EditRoomModal from "../../modal/roomModal/edit";
import {
  Box,
  Text,
  Button,
  UnorderedList,
  ListItem,
  Spinner,
  Alert,
} from "@chakra-ui/react";
import { getRooms } from "../../../services/roomService";
import DeleteRoom from "../../modal/roomModal/delete";

interface RoomData {
  id: string;
  roomNumber: string;
  bedType: string;
  roomFloor: string;
  roomFacility: string;
  Available: string;
}

export default function TableRoom() {
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const data = await getRooms(1, 10, "bedType:ASC");
        if (data && Array.isArray(data.data)) {
          setRooms(data.data);
        } else {
          setError("Unexpected data format");
        }
      } catch (error) {
        setError("Failed to fetch room data");
      } finally {
        setLoading(false);
      }
    };
    fetchRoomData();
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveRoomId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const toggleMenu = (roomId: string) => {
    setActiveRoomId((prev) => (prev === roomId ? null : roomId));
  };

  if (loading) return <Spinner />;
  if (error) return <Alert status="error">{error}</Alert>;

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
          ref={menuRef}
          fontSize="14px"
          fontWeight="400"
          key={room.id}
          display="flex"
          maxW="1020px"
          w="100%"
          p="17px 24px"
          position="relative"
          border="1px solid #d4e5fa"
        >
          <Text w="15%" color="grey.900">
            {room.roomNumber}
          </Text>
          <Text w="20%">{room.bedType}</Text>
          <Text w="15%">{room.roomFloor}</Text>
          <Text w="27%">{room.roomFacility}</Text>
          <Text w="16%" pl="48px" mr="20px">
            {room.Available}
          </Text>
          <Button
            p="0"
            onClick={() => toggleMenu(room.id)}
            bg="white.200"
            color="grey.800"
            _hover={{ bg: "white.200" }}
            height="15px"
          >
            ⋮
          </Button>
          {activeRoomId === room.id && (
            <Box
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
              <EditRoomModal></EditRoomModal>
              <DeleteRoom></DeleteRoom>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
