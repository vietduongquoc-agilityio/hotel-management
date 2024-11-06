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
import { getRooms, updateRoom, createRoomApi } from "@/services/roomService";
import { useRoomStore } from "@/store";

const RoomPage = () => {
  const { fetchRates, addRate, updateRate, deleteRate } = useRoomStore();
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isAddRoom] = useState(false);
  const toast = useToast();
  const [bedType, setBedType] = useState("");
  const [roomFloor, setRoomFloor] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [totalRooms, setTotalRooms] = useState(0);
  const [availableRooms, setAvailableRooms] = useState(0);
  const [bookedRooms, setBookedRooms] = useState(0);

  const fetchRooms = async (currentPage: number, pageSize: number) => {
    setLoading(true);
    try {
      const { rooms, pagination } = await getRooms(currentPage, pageSize);
      setRooms(rooms);
      setPageCount(pagination.pageCount);
      setTotalRooms(pagination.total);

      const availableCount = rooms.filter(
        (room: { roomStatus: string }) => room.roomStatus === "Available"
      ).length;
      const bookedCount = rooms.filter(
        (room: { roomStatus: string }) => room.roomStatus === "Booked"
      ).length;
      setAvailableRooms(availableCount);
      setBookedRooms(bookedCount);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRoom = async (roomData: NewRoomData) => {
    try {
      const { data } = await createRoomApi(roomData);
      setRooms((prevRooms) => [data, ...prevRooms]);
      addRate(data);
    } catch (error) {
      console.log("Error handleAddRoom", error);
    }
  };

  const handleDeleteRoom = (deletedRoomId: string) => {
    setRooms((prevRooms) =>
      prevRooms.filter((room) => room.documentId !== deletedRoomId)
    );
    deleteRate(deletedRoomId);
  };

  const handleEditRoom = async (updatedRoomData: RoomData) => {
    try {
      await updateRoom(updatedRoomData.documentId, updatedRoomData);
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.documentId === updatedRoomData.documentId
            ? updatedRoomData
            : room
        )
      );
      updateRate(updatedRoomData);

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
    fetchRooms(currentPage, pageSize);
  }, [currentPage, fetchRates]);

  const handleSelectedBedType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedBedType = event.target.value;
    setBedType(selectedBedType);
    fetchRooms(currentPage, pageSize);
  };

  const handleSelectedRoomFloor = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedRoomFloor = event.target.value;
    setRoomFloor(selectedRoomFloor);
    fetchRooms(currentPage, pageSize);
  };

  const handleSelectedRoomStatus = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedRoomStatus = event.target.value;
    setRoomStatus(selectedRoomStatus);
    fetchRooms(currentPage, pageSize);
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
