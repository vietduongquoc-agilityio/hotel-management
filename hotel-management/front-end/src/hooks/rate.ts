import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Services
import { createRateApi, deleteRate, getRates, updateRate } from "@/services";

// Interfaces
import { NewRateData, RateData } from "@/interfaces";

interface UseGetRateProps {
  currentPage: number;
  pageSize: number;
}

interface RateResponse {
  rates: RateData[];
  pagination: {
    total: number;
    pageCount: number;
  };
}

export const useGetRate = ({
  currentPage,
  pageSize,
}: UseGetRateProps) => {
  const { data, isLoading, error } = useQuery<RateResponse, Error>({
    queryKey: ["rates", currentPage, pageSize],
    queryFn: async () => {
      const response = await getRates(currentPage, pageSize);
      return response as RateResponse;
    },
  });

  return {
    rates: data?.rates || [],
    pagination: data?.pagination,
    isLoading,
    error,
  };
};

export const useCreateRate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewRateData) => createRateApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rates"] });
    },
    onError: (err: Error) => {
      console.error("Failed to create rate:", err.message);
    },
  });
};

export const useUpdateRate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { rateId: string; requestPayload: NewRateData }) =>
      updateRate(data.rateId, data.requestPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rates"] });
    },
    onError: (err: Error) => {
      console.error("Failed to update rate:", err.message);
    },
  });
};

export const useDeleteRate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rateId: string) => deleteRate(rateId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rates"] });
    },
    onError: (err: Error) => {
      console.error("Failed to delete rate:", err.message);
    },
  });
};
