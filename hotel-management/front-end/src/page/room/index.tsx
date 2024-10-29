import { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import TableRoom from "../../components/table/room";
import AddRoomModal from "../../components/modal/roomModal/add";
import Label from "../../components/label/room/labelRoom";
import Pagination from "../../components/pagination";
import { getRooms } from "../../services/roomService";

const RoomPage = () => {
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const data = await getRooms(1, 10);
      setRooms(data.data);
    } catch (error) {
      console.error("Error fetching rates:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeAddRoomModal = () => setIsAddRoomOpen(false);
  const handleAddRoom = (roomData: any) => {
    setRooms([...rooms, roomData]);
  };

  const handleDeleteRoom = (deletedRoomId: string) => {
    setRooms((prevRates) =>
      prevRates.filter((room) => room.documentId !== deletedRoomId)
    );
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <Box>
      <Heading mb="16px" fontSize="12px" fontWeight="500" color="grey.500">
        Room
      </Heading>
      <Label />
      <TableRoom
        rooms={rooms}
        loading={loading}
        onDeleteRoom={handleDeleteRoom}
      />
      <Pagination />
      {isAddRoomOpen && (
        <AddRoomModal onClose={closeAddRoomModal} onAddRoom={handleAddRoom} />
      )}
    </Box>
  );
};

export default RoomPage;
