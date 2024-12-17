import { useQuery } from "@tanstack/react-query";

// Services
import { getRooms } from "@/services";

// Interfaces
import { RoomData } from "@/interfaces";

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
