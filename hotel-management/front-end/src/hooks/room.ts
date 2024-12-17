import { useQuery, useMutation } from "@tanstack/react-query";

// Services
import { getRooms, createRoomApi, updateRoom, deleteRoom } from "@/services";

// InterFaces
import { RoomData, NewRoomData } from "@/interfaces";

// Interface for query return
interface RoomResponse {
  rooms: RoomData[];
  pagination: {
    total: number;
    pageCount: number;
  };
}

export const useGetRoom = ({
  currentPage,
  pageSize,
}: {
  currentPage: number;
  pageSize: number;
}) => {
  const { data, isLoading, refetch } = useQuery<RoomResponse, Error>({
    queryKey: ["rooms", currentPage, pageSize],
    queryFn: async () => await getRooms(currentPage, pageSize),
  });

  // Mutation hooks with refetch
  const addRoomMutation = useMutation<RoomData, Error, NewRoomData>(
    async (newRoomData: NewRoomData) => {
      const result = await createRoomApi(newRoomData);
      return result;
    },
    {
      onSuccess: () => refetch(),
    }
  );

  const editRoomMutation = useMutation<
    RoomData,
    Error,
    { roomId: string; updatedData: RoomData }
  >(
    async ({ roomId, updatedData }) => {
      const result = await updateRoom(roomId, updatedData);
      return result;
    },
    {
      onSuccess: () => refetch(),
    }
  );

  const deleteRoomMutation = useMutation<void, Error, string>(
    async (roomId: string) => {
      await deleteRoom(roomId);
    },
    {
      onSuccess: () => refetch(),
    }
  );

  return {
    isLoading,
    rooms: data?.rooms || [],
    pagination: data?.pagination || { total: 0, pageCount: 0 },
    addRoom: addRoomMutation.mutateAsync,
    editRoom: editRoomMutation.mutateAsync,
    deleteRoom: deleteRoomMutation.mutateAsync,
  };
};
