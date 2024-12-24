import { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";

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

// Constants
import { DEFAULT_CURRENT_PAGE, DEFAULT_PAGE_SIZE } from "@/constants";

const RoomPage = () => {
  const { availableRooms, bookedRooms, calculateRoomCounts } = useRoomStore();

  const { saveRate } = useRateStore();
  const { rates } = useGetRate({
    currentPage: DEFAULT_CURRENT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [bedType, setBedType] = useState("");
  const [roomFloor, setRoomFloor] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [isAddRoom, setIsAddRoom] = useState(false);

  const deleteRoom = useDeleteRoom();
  const createRoom = useCreateRoom();
  const updateRoom = useUpdateRoom();

  const {
    rooms,
    pagination,
    isLoading: roomsLoading,
  } = useGetRoom({
    currentPage,
    pageSize,
    filters: {
      bedType,
      roomFloor,
      roomStatus,
    },
  });

  const { pageCount = 1, total = 1 } = pagination || {};

  useEffect(() => {
    if (rates.length > 0) {
      setIsAddRoom(true);
      const bedTypeOptions = rates.map((item) => ({
        value: item.roomType,
        label: `${item.roomType} Bed`,
      }));
      saveRate(rates, bedTypeOptions);
    } else {
      setIsAddRoom(false);
    }
  }, [rates, saveRate]);

  useEffect(() => {
    if (rooms.length > 0) {
      calculateRoomCounts(rooms);
    }
  }, [rooms, calculateRoomCounts]);

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(DEFAULT_CURRENT_PAGE);
  };

  const handleAddRoom = async (newRoom: NewRoomData) => {
    createRoom.mutate(newRoom);
    setCurrentPage(DEFAULT_CURRENT_PAGE);
  };

  const handleDeleteRoom = async (deletedRoomId: string) => {
    deleteRoom.mutate(deletedRoomId);
  };

  const handleEditRoom = async (updatedRoomData: RoomData) => {
    const requestPayload = {
      bedType: updatedRoomData.bedType,
      roomFacility: updatedRoomData.roomFacility,
      roomFloor: updatedRoomData.roomFloor,
      roomStatus: updatedRoomData.roomStatus,
      roomNumber: updatedRoomData.roomNumber,
    };

    updateRoom.mutate({
      roomId: updatedRoomData.documentId,
      requestPayload: requestPayload,
    });
  };

  const handleSelectedBedType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBedType = e.target.value;
    setBedType(selectedBedType);
    setCurrentPage(DEFAULT_CURRENT_PAGE);
  };

  const handleSelectedRoomFloor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoomFloor = e.target.value;
    setRoomFloor(selectedRoomFloor);
    setCurrentPage(DEFAULT_CURRENT_PAGE);
  };

  const handleSelectedRoomStatus = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedRoomStatus = e.target.value;
    setRoomStatus(selectedRoomStatus);
    setCurrentPage(DEFAULT_CURRENT_PAGE);
  };

  console.log("roomsLoading:", roomsLoading, "rooms:", rooms);

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
