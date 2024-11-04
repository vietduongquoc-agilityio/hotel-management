import { Box, UnorderedList, ListItem, Text, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import AddRoomModal from "../../modal/roomModal/add/index";
import { getRates } from "../../../services/rateServices";
import RoomData from "../../../constants/interfaceTypes/roomTypes";
import RateData from "../../../constants/interfaceTypes/rateTypes";
import Spinner from "../../spinner";

const LabelRoom = ({
  onAddRoom,
  isAddRoom,
}: {
  onAddRoom: (roomData: RoomData) => void;
}) => {
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);

  const handleOpenAddRoomModal = () => {
    setIsAddRoomModalOpen(true)
  };

  const handleCloseAddRoomModal = () => {
    console.log('handleCloseAddRoomModal')
    setIsAddRoomModalOpen(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={4}
    >
      <UnorderedList styleType="none" m={0} display="flex" gap={4}>
        <ListItem>
          <Text>All rooms (100)</Text>
        </ListItem>
        <ListItem>
          <Text>Available rooms (20)</Text>
        </ListItem>
        <ListItem>
          <Text>Booked (80)</Text>
        </ListItem>
      </UnorderedList>

      
        <>``
          {/* <Button
            onClick={handleOpenAddRoomModal}
            disabled={!isAddRoom}
            cursor={!isAddRoom ? "not-allowed" : "pointer"}
          >
            Add room
          </Button> */}

          <AddRoomModal
            onAddRoom={onAddRoom}
          />
        </>
    </Box>
  );
};

export default LabelRoom;
