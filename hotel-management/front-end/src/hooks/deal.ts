import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Services
import { getDeals, createDealApi, updateDeal, deleteDeal } from "@/services";

// Interfaces
import { DealData, NewDealData } from "@/interfaces";

interface UseGetDealProps {
  currentPage: number;
  pageSize: number;
  field?: string;
  value?: string;
}

interface DealResponse {
  deals: DealData[];
  pagination: {
    total: number;
    pageCount: number;
  };
}

export const useGetDeal = ({
  currentPage,
  pageSize,
  field,
  value,
}: UseGetDealProps) => {
  const { data, isFetching, error } = useQuery<DealResponse, Error>({
    queryKey: ["deals", currentPage, pageSize, field, value],
    queryFn: async () => {
      const response = await getDeals(currentPage, pageSize, value, field);
      return response as DealResponse;
    },
  });

  return {
    deals: data?.deals || [],
    pagination: data?.pagination,
    isLoading: isFetching,
    error,
  };
};

export const useCreateDeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewDealData) => createDealApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
    },
  });
};

export const useUpdateDeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { dealId: string; requestPayload: NewDealData }) =>
      updateDeal(data.dealId, data.requestPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
    },
  });
};

export const useDeleteDeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dealId: string) => deleteDeal(dealId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
    },
  });
};
