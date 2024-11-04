import { useCallback, useEffect, useState } from "react";
import { Box, Heading, useToast } from "@chakra-ui/react";
import TableRoom from "../../components/table/room";
import AddRoomModal from "../../components/modal/roomModal/add";
import Pagination from "../../components/pagination";
import { getRooms, updateRoom } from "../../services/roomService"; // Ensure updateRoom service is imported
import LabelRoom from "../../components/label/room/labelRoom";
import Spinner from "../../components/spinner/index";
import { RoomData } from "../../constants/interfaceTypes/roomTypes";

const RoomPage = () => {
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchRooms = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const { rooms, pagination } = await getRooms(page, pageSize);
        setRooms(rooms);
        setPageCount(pagination.pageCount);
      } catch (error) {
        toast({
          title: "Error fetching rooms",
          description: "There was an issue retrieving the room data.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    },
    [pageSize, toast]
  );

  const closeAddRoomModal = () => setIsAddRoomOpen(false);

  const handleAddRoom = (roomData: RoomData) => {
    setRooms((prevRooms) => [...prevRooms, roomData]);
  };

  const handleDeleteRoom = (deletedRoomId: string) => {
    setRooms((prevRooms) =>
      prevRooms.filter((room) => room.documentId !== deletedRoomId)
    );
  };

  const handleEditRoom = async (updatedRoomData: RoomData) => {
    try {
      const requestData = {
        bedType: updatedRoomData.bedType,
        roomNumber: updatedRoomData.roomNumber,
        roomFloor: updatedRoomData.roomFloor,
        roomFacility: updatedRoomData.roomFacility,
        roomStatus: updatedRoomData.roomStatus
      }

      await updateRoom(updatedRoomData.documentId, requestData);

      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.documentId === updatedRoomData.documentId
            ? updatedRoomData
            : room
        )
      );

      toast({
        title: "Room updated",
        description: "Room details have been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error updating room",
        description: "There was an issue updating the room data.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error updating room:", error);
    }
  };

  useEffect(() => {
    fetchRooms(currentPage);
  }, [fetchRooms, currentPage]);

  return (
    <Box>
      <Heading mb="16px" fontSize="12px" fontWeight="500" color="grey.500">
        Room
      </Heading>
      <LabelRoom onAddRoom={handleAddRoom} />
      {loading ? (
        <Spinner />
      ) : (
        <TableRoom
          onEditRoom={handleEditRoom}
          rooms={rooms}
          onDeleteRoom={handleDeleteRoom}
        />
      )}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        pageCount={pageCount}
      />
      {isAddRoomOpen && (
        <AddRoomModal onClose={closeAddRoomModal} onAddRoom={handleAddRoom} />
      )}
    </Box>
  );
};

export default RoomPage;
