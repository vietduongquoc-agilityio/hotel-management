import { useEffect, useState } from "react";
import { Box, Heading, useToast } from "@chakra-ui/react";

// Constants
import { NewRoomData, RoomData } from "@/constant/InterfaceTypes/RoomTypes";

// Components
import TableRoom from "@/components/Tables/Room";
import Pagination from "@/components/Pagination";
import LabelRoom from "@/components/Label/Room";
import Spinner from "@/components/Spinner";

// Services
import {
  getRooms,
  updateRoom,
  createRoomApi,
  deleteRoom,
} from "@/services/roomService";
import { getRates } from "@/services/rateServices";

const RoomPage = () => {
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isAddRoom, setIsAddRoom] = useState(false);
  const toast = useToast();
  const [bedType, setBedType] = useState("");
  const [roomFloor, setRoomFloor] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [totalRooms, setTotalRooms] = useState(0);
  const [availableRooms, setAvailableRooms] = useState(0);
  const [bookedRooms, setBookedRooms] = useState(0);

  const fetchRooms = async (
    currentPage: number,
    pageSize: number,
    field?: string,
    value?: string
  ) => {
    setLoading(true);
    try {
      const { rooms, pagination } = await getRooms(
        currentPage,
        pageSize,
        field,
        value
      );
      setRooms(rooms);
      setPageCount(pagination.pageCount);
      setTotalRooms(pagination.total);

      // Calculate the available and booked room counts
      calculateRoomCounts(rooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateRoomCounts = (rooms: RoomData[]) => {
    const availableCount = rooms.filter(
      (room) => room.roomStatus === "Available"
    ).length;
    const bookedCount = rooms.filter(
      (room) => room.roomStatus === "Booked"
    ).length;
    setAvailableRooms(availableCount);
    setBookedRooms(bookedCount);
  };

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
    try {
      const { data } = await createRoomApi(roomData);
      setRooms((prevRooms) => [data, ...prevRooms]);
      fetchRooms(currentPage, pageSize);
    } catch (error) {
      console.log("Error handleAddRoom", error);
    }
  };

  const handleDeleteRoom = async (deletedRoomId: string) => {
    try {
      await deleteRoom(deletedRoomId);
      fetchRooms(currentPage, pageSize);
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const handleEditRoom = async (updatedRoomData: RoomData) => {
    try {
      const requestData = {
        bedType: updatedRoomData.bedType,
        roomNumber: updatedRoomData.roomNumber,
        roomFloor: updatedRoomData.roomFloor,
        roomFacility: updatedRoomData.roomFacility,
        roomStatus: updatedRoomData.roomStatus,
      };

      await updateRoom(updatedRoomData.documentId, requestData);
      fetchRooms(currentPage, pageSize);

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
  }, []);

  useEffect(() => {
    fetchRooms(currentPage, pageSize);
  }, [currentPage]);

  const handleSelectedBedType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedBedType = event.target.value;
    setBedType(selectedBedType);
    fetchRooms(currentPage, pageSize, "bedType", selectedBedType);
  };

  const handleSelectedRoomFloor = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedRoomFloor = event.target.value;
    setRoomFloor(selectedRoomFloor);
    fetchRooms(currentPage, pageSize, "roomFloor", selectedRoomFloor);
  };

  const handleSelectedRoomStatus = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedRoomStatus = event.target.value;
    setRoomStatus(selectedRoomStatus);
    fetchRooms(currentPage, pageSize, "roomStatus", selectedRoomStatus);
  };

  return (
    <Box>
      <Heading mb="16px" fontSize="12px" fontWeight="500" color="grey.500">
        Room
      </Heading>

      <LabelRoom
        totalRooms={totalRooms}
        availableRooms={availableRooms}
        bookedRooms={bookedRooms}
        onAddRoom={handleAddRoom}
        isAddRoom={isAddRoom}
        selectedBedType={bedType}
        selectedRoomFloor={roomFloor}
        selectedRoomStatus={roomStatus}
        handleSelectedBedType={handleSelectedBedType}
        handleSelectedRoomFloor={handleSelectedRoomFloor}
        handleSelectedRoomStatus={handleSelectedRoomStatus}
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
