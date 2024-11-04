import { useCallback, useEffect, useState } from "react";
import { Box, Heading, useToast } from "@chakra-ui/react";

// Constants
import { NewRoomData, RoomData } from "@/constants/interfaceTypes/roomTypes";

// Components
import TableRoom from "@/components/table/room";
import Pagination from "@/components/pagination";
import LabelRoom from "@/components/label/room/labelRoom";
import Spinner from "@/components/spinner/index";

// Services
import { getRooms, updateRoom, createRoomApi } from "@/services/roomService";
import { getRates } from "@/services/rateServices";


const RoomPage = () => {
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isAddRoom, setIsAddRoom] = useState(false);
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
  const fetchRates = async () => {
    setLoading(true);
    try {
      const { data } = await getRates(1, 10);
      if (data.length > 0) {
        setIsAddRoom(true);
      }
    } catch (error) {
      console.error("Error fetching rates", error);
    } finally {
      setLoading(false);
    }
  };

  

  const handleAddRoom = async (roomData: NewRoomData) => {
    console.log('handleAddRoom: ', roomData)
    try {
      const { data } = await createRoomApi(roomData);
      const listRoom = rooms.slice(0, -1);
      setRooms([data, ...listRoom]);
    } catch (error) {
      
    }
    
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
    fetchRates();
  }, [])

  useEffect(() => {
    fetchRooms(currentPage);
  }, [fetchRooms, currentPage]);

  return (
    <Box>
      <Heading mb="16px" fontSize="12px" fontWeight="500" color="grey.500">
        Room
      </Heading>
      <LabelRoom
        onAddRoom={handleAddRoom}
        isAddRoom={isAddRoom}
      />
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
    </Box>
  );
};

export default RoomPage;
