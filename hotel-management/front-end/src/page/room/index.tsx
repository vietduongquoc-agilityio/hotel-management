import { useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import TableRoom from "../../components/table/room";
import AddRoomModal from "../../components/modal/roomModal/add";
import Label from "../../components/label/room/labelRoom";
import Pagination from "../../components/pagination";

const RoomPage = () => {
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [rooms, setRooms] = useState<any[]>([]);

  const closeAddRoomModal = () => setIsAddRoomOpen(false);
  const handleAddRoom = (roomData: any) => {
    setRooms([...rooms, roomData]);
  };

  return (
    <Box>
      <Heading mb="16px" fontSize="12px" fontWeight="500" color="grey.500">
        Room
      </Heading>
      <Label />
      <TableRoom />
      <Pagination />
      {isAddRoomOpen && (
        <AddRoomModal onClose={closeAddRoomModal} onAddRoom={handleAddRoom} />
      )}
    </Box>
  );
};

export default RoomPage;
