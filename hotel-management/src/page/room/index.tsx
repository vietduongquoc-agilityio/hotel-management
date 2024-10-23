import { useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import TableRoom from "../../components/table/room";
import AddRoomModal from "../../components/modal/rateModal/add";
import Label from "../../components/label/labelRoom";
import Pagination from "../../components/pagination/pagination";

export default function RoomPage() {
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [rooms, setRooms] = useState<any[]>([]);

  const handleAddRoomClick = () => setIsAddRoomOpen(true);
  const closeAddRoomModal = () => setIsAddRoomOpen(false);
  const handleAddRoom = (roomData: any) => {
    setRooms([...rooms, roomData]);
  };

  return (
    <Box>
      <Heading as="h1" mb={4}>
        Room
      </Heading>
      <Label handleClick={handleAddRoomClick} />
      <TableRoom />
      <Pagination />
      {isAddRoomOpen && (
        <AddRoomModal onClose={closeAddRoomModal} onAddRoom={handleAddRoom} />
      )}
    </Box>
  );
}
