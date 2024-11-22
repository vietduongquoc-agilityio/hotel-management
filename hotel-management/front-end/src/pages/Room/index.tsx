import { useEffect, useState } from "react";
import { Box, Heading, useToast } from "@chakra-ui/react";

// InterFace
import { NewRoomData, RoomData } from "@/interfaces";

// Components
import { LabelRoom, Pagination, Spinner, Table } from "@/components";

// Store
import { useRoomStore } from "@/store/RoomStore";
import { useRateStore } from "@/store/RateStore";

const RoomPage = () => {
  const {
    rooms,
    totalRooms,
    pageCount,
    availableRooms,
    bookedRooms,
    loading: roomsLoading,
    fetchRooms,
    addRoom,
    editRoom,
    deleteRoom,
  } = useRoomStore();
  const { rates, loading: ratesLoading, fetchRates } = useRateStore();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [bedType, setBedType] = useState("");
  const [roomFloor, setRoomFloor] = useState("");
  const [roomStatus, setRoomStatus] = useState("");

  const [isAddRoom, setIsAddRoom] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchRates(currentPage, pageSize);
  }, [currentPage, fetchRates]);

  useEffect(() => {
    fetchRooms(currentPage, pageSize);
  }, [fetchRooms, currentPage]);

  useEffect(() => {
    if (rates.length > 0) {
      setIsAddRoom(true);
    }
  }, [rates]);

  const handleAddRoom = async (newRoom: NewRoomData) => {
    await addRoom(newRoom);
  };

  const handleDeleteRoom = async (deletedRoomId: string) => {
    await deleteRoom(deletedRoomId);
  };

  const handleEditRoom = async (updatedRoomData: RoomData) => {
    const requestPayload = {
      bedType: updatedRoomData.bedType,
      roomFacility: updatedRoomData.roomFacility,
      roomFloor: updatedRoomData.roomFloor,
      roomStatus: updatedRoomData.roomStatus,
      roomNumber: updatedRoomData.roomNumber,
    };

    await editRoom(updatedRoomData.documentId, requestPayload);

    fetchRooms(currentPage, pageSize);
    toast({
      title: "Room updated",
      description: "Room details have been successfully updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSelectedBedType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBedType = e.target.value;
    setBedType(selectedBedType);
    fetchRooms(currentPage, pageSize, "bedType", selectedBedType);
  };

  const handleSelectedRoomFloor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoomFloor = e.target.value;
    setRoomFloor(selectedRoomFloor);
    fetchRooms(currentPage, pageSize, "roomFloor", selectedRoomFloor);
  };

  const handleSelectedRoomStatus = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedRoomStatus = e.target.value;
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

      {roomsLoading || ratesLoading ? (
        <Spinner />
      ) : (
        <Table
          data={rooms}
          type="room"
          onDelete={handleDeleteRoom}
          onEdit={handleEditRoom}
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
