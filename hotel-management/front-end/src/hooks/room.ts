import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Services
import { createRoomApi, deleteRoom, getRooms, updateRoom } from "@/services";

// Interfaces
import { NewRoomData, RoomData } from "@/interfaces";

interface UseGetRoomProps {
  currentPage: number;
  pageSize: number;
  field?: string;
  value?: string;
}

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
  field,
  value,
}: UseGetRoomProps) => {
  const { data, isLoading, error } = useQuery<RoomResponse, Error>({
    queryKey: ["rooms", currentPage, pageSize, field, value],
    queryFn: async () => {
      const response = await getRooms(currentPage, pageSize, field, value);
      return response as RoomResponse;
    },
  });

  return {
    rooms: data?.rooms || [],
    pagination: data?.pagination,
    isLoading,
    error,
  };
};

export const useCreateRoom = (newRoom: NewRoomData) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewRoomData) => createRoomApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};

export const useUpdateRoom = (
  documentId: string,
  requestPayload: {
    bedType: string;
    roomFacility: string;
    roomFloor: string;
    roomStatus: string;
    roomNumber: string;
  }
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { roomId: string; requestPayload: NewRoomData }) =>
      updateRoom(data.roomId, data.requestPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};

export const useDeleteRoom = (deletedRoomId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roomId: string) => deleteRoom(roomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};
