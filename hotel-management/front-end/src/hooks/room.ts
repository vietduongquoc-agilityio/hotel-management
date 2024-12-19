import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Services
import { createRoomApi, deleteRoom, getRooms, updateRoom } from "@/services";

// Interfaces
import { NewRoomData, RoomData } from "@/interfaces";

interface UseGetRoomProps {
  currentPage: number;
  pageSize: number;
  filters?: {
    bedType?: string;
    roomFloor?: string;
    roomStatus?: string;
  };
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
  filters,
}: UseGetRoomProps) => {
  const { data, isLoading } = useQuery<RoomResponse>({
    queryKey: ["rooms", currentPage, pageSize, filters],
    queryFn: () => getRooms(currentPage, pageSize, filters || {}),
  });
  
  return {
    rooms: data?.rooms || [],
    pagination: data?.pagination,
    isLoading,
  };
};

export const useCreateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewRoomData) => createRoomApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { roomId: string; requestPayload: NewRoomData }) =>
      updateRoom(data.roomId, data.requestPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roomId: string) => deleteRoom(roomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};
