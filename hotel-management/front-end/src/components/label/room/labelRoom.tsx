import { Box, UnorderedList, ListItem, Text } from "@chakra-ui/react";
import AddRoomModal from "@/components/modal/roomModal/add";
import { RoomData } from "@/constants/interfaceTypes/roomTypes";

interface LabelRoomProps {
  onAddRoom: (roomData: RoomData) => void;
  isAddRoom: boolean;
}

const LabelRoom = ({ onAddRoom }: LabelRoomProps) => {
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

      <>
        {/* <Button
            onClick={handleOpenAddRoomModal}
            disabled={!isAddRoom}
            cursor={!isAddRoom ? "not-allowed" : "pointer"}
          >
            Add room
          </Button> */}
        <AddRoomModal onAddRoom={onAddRoom} />
      </>
    </Box>
  );
};

export default LabelRoom;
