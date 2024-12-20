import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Services
import {
  getGuests,
  createGuestApi,
  updateGuest,
  deleteGuest,
} from "@/services";

// Interfaces
import { GuestData, NewGuestData } from "@/interfaces";

interface UseGetGuestProps {
  currentPage: number;
  pageSize: number;
  filters?: {
    guestName?: string;
    stay?: string;
    price?: string;
  };
}

interface GuestResponse {
  guests: GuestData[];
  pagination: {
    total: number;
    pageCount: number;
  };
}

export const useGetGuest = ({
  currentPage,
  pageSize,
  filters,
}: UseGetGuestProps) => {
  const { data, isLoading, error } = useQuery<GuestResponse, Error>({
    queryKey: ["guests", currentPage, pageSize, filters],
    queryFn: async () => {
      const response = await getGuests(currentPage, pageSize, filters || {});
      return response as GuestResponse;
    },
  });

  return {
    guests: data?.guests || [],
    pagination: data?.pagination,
    isLoading,
    error,
  };
};

export const useCreateGuest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewGuestData) => createGuestApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
  });
};

export const useUpdateGuest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { guestId: string; requestPayload: NewGuestData }) =>
      updateGuest(data.guestId, data.requestPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
  });
};

export const useDeleteGuest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (guestId: string) => deleteGuest(guestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
  });
};
