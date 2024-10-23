/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
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
import EditRoom from "../../modal/roomModal/edit";
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
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

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

  const handleEdit = (room: RoomData) => {
    setSelectedRoom(room);
    setIsEditOpen(true);
    setActiveRoomId(null);
  };

  const handleDelete = (room: RoomData) => {
    setSelectedRoom(room);
    setIsDeleteOpen(true);
    setActiveRoomId(null);
  };

  const toggleMenu = (roomId: string) => {
    setActiveRoomId((prev) => (prev === roomId ? null : roomId));
  };

  if (loading) return <Spinner />;
  if (error) return <Alert status="error">{error}</Alert>;

  return (
    <Box>
      <UnorderedList>
        <ListItem>Room number</ListItem>
        <ListItem>Bed type</ListItem>
        <ListItem>Room floor</ListItem>
        <ListItem>Room facility</ListItem>
        <ListItem>Status</ListItem>
      </UnorderedList>
      {rooms.map((room) => (
        <Box key={room.id}>
          <Text>{room.roomNumber}</Text>
          <Text>{room.bedType}</Text>
          <Text>{room.roomFloor}</Text>
          <Text>{room.roomFacility}</Text>
          <Text>{room.Available}</Text>
          <Button onClick={() => toggleMenu(room.id)}>⋮</Button>
          {activeRoomId === room.id && (
            <Box>
              <Button onClick={() => handleEdit(room)}>Edit</Button>
              <Button onClick={() => handleDelete(room)}>Delete</Button>
            </Box>
          )}
        </Box>
      ))}

      {isEditOpen && selectedRoom && (
        <EditRoom room={selectedRoom} onClose={() => setIsEditOpen(false)} />
      )}
      {isDeleteOpen && selectedRoom && (
        <DeleteRoom
          room={selectedRoom}
          onClose={() => setIsDeleteOpen(false)}
        />
      )}
    </Box>
  );
}
