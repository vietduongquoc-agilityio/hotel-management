import { useEffect, useState } from "react";
import { Box, Heading, useToast } from "@chakra-ui/react";

// InterFace
import { NewRoomData, RoomData } from "@/interfaces";

// Components
import {
  LabelRoom,
  PageSizeSelector,
  Pagination,
  Spinner,
  Table,
} from "@/components";

// Store
import { useRateStore, useRoomStore } from "@/stores";

// Hooks
import {
  useCreateRoom,
  useDeleteRoom,
  useGetRate,
  useGetRoom,
  useUpdateRoom,
} from "@/hooks";

const RoomPage = () => {
  const {
    availableRooms,
    bookedRooms,
    isLoading: roomsLoading,
    // addRoom,
    // editRoom,
    // deleteRoom,
    calculateRoomCounts,
  } = useRoomStore();

  const { saveRate } = useRateStore();
  const { data: ratesData } = useGetRate();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [bedType, setBedType] = useState("");
  const [roomFloor, setRoomFloor] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [isAddRoom, setIsAddRoom] = useState(false);
  const toast = useToast();

  const { rooms, pagination } = useGetRoom({
    currentPage,
    pageSize,
  });
  const { pageCount = 1, total = 1 } = pagination || {};

  useEffect(() => {
    if (ratesData?.rates.length > 0) {
      setIsAddRoom(true);
      const { rates, bedTypeOptions } = ratesData || {};
      saveRate(rates, bedTypeOptions);
    }
  }, [ratesData, saveRate]);

  useEffect(() => {
    if (rooms.length > 0) {
      calculateRoomCounts(rooms);
    }
  }, [rooms, calculateRoomCounts]);

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const handleAddRoom = async (newRoom: NewRoomData) => {
    await useCreateRoom(newRoom);
    setCurrentPage(1);
  };

  const handleDeleteRoom = async (deletedRoomId: string) => {
    await useDeleteRoom(deletedRoomId);
  };

  const handleEditRoom = async (updatedRoomData: RoomData) => {
    const requestPayload = {
      bedType: updatedRoomData.bedType,
      roomFacility: updatedRoomData.roomFacility,
      roomFloor: updatedRoomData.roomFloor,
      roomStatus: updatedRoomData.roomStatus,
      roomNumber: updatedRoomData.roomNumber,
    };

    await useUpdateRoom(updatedRoomData.documentId, requestPayload);

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
  };

  const handleSelectedRoomFloor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoomFloor = e.target.value;
    setRoomFloor(selectedRoomFloor);
  };

  const handleSelectedRoomStatus = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedRoomStatus = e.target.value;
    setRoomStatus(selectedRoomStatus);
  };

  return (
    <Box>
      <Heading mb="16px" fontSize="12px" fontWeight="500" color="grey.500">
        Room
      </Heading>

      <LabelRoom
        totalRooms={total}
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

      {roomsLoading ? (
        <Spinner />
      ) : (
        <Table
          type="room"
          onDelete={handleDeleteRoom}
          onEdit={handleEditRoom}
          data={rooms || []}
        />
      )}
      <Box display="flex" mt="40px">
        <PageSizeSelector
          onPageSizeChange={handlePageSizeChange}
          pageSize={pageSize}
        />
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          pageCount={pageCount}
        />
      </Box>
    </Box>
  );
};

export default RoomPage;
