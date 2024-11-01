import { Box, UnorderedList, ListItem, Text, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import AddRoomModal from "../../modal/roomModal/add/index";
import { getRates } from "../../../services/rateServices";
import RoomData from "../../constants/interfaceTypes/roomTypes";
import RateData from "../../constants/interfaceTypes/rateTypes";
import Spinner from "../../spinner";

const LabelRoom = ({
  onAddRoom,
}: {
  onAddRoom: (roomData: RoomData) => void;
}) => {
  const [rates, setRates] = useState<RateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      try {
        const data = await getRates(1, 10);
        setRates(data.data);
      } catch (error) {
        console.error("Error fetching rates", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  const handleOpenAddRoomModal = () => {
    if (rates.length > 0) {
      setIsAddRoomModalOpen(true);
    }
  };

  const handleCloseAddRoomModal = () => {
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

      {loading ? (
        <Spinner />
      ) : (
        <>
          {!isAddRoomModalOpen && (
            <Button
              onClick={handleOpenAddRoomModal}
              disabled={rates.length === 0}
              cursor={rates.length === 0 ? "not-allowed" : "pointer"}
            >
              Add room
            </Button>
          )}

          {isAddRoomModalOpen && (
            <AddRoomModal
              onAddRoom={onAddRoom}
              onClose={handleCloseAddRoomModal}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default LabelRoom;
