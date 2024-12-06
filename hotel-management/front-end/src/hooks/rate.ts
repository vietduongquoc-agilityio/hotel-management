

// Libs
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRates, createRateApi, updateRate, deleteRate } from '@/services';
import { NewRateData } from '@/interfaces';
import { createStandaloneToast } from "@chakra-ui/react";

// Constants
const { toast } = createStandaloneToast();

// Toast Error Handler
const showErrorToast = (message: string) => {
  toast({
    title: "Error",
    description: message,
    status: "error",
    duration: 3000,
    isClosable: true,
  });
};

export const useRates = (page: number, pageSize: number) => {
  const queryClient = useQueryClient();

  // Fetch Rates Data using React Query's `useQuery`
  const { data, isLoading, error } = useQuery({
    queryKey: ['rates', { page, pageSize }],
    queryFn: () => getRates(page, pageSize),
  });

  const useAddRate = useMutation({
    mutationFn: createRateApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['rates', { page, pageSize }]);
      toast({
        title: "Rate Created",
        description: "Rate added successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      showErrorToast("Failed to create rate.");
    },
  });

  const useEditRate = useMutation({
    mutationFn: ({ rateId, rateData }: { rateId: string; rateData: NewRateData }) => 
      updateRate(rateId, rateData),
    onSuccess: () => {
      queryClient.invalidateQueries(['rates', { page, pageSize }]);
      toast({
        title: "Rate Updated",
        description: "Rate updated successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      showErrorToast("Failed to update rate.");
    },
  });

  const useDeleteRate = useMutation({
    mutationFn: deleteRate,
    onSuccess: () => {
      queryClient.invalidateQueries(['rates', { page, pageSize }]);
      toast({
        title: "Rate Deleted",
        description: "Rate deleted successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      showErrorToast("Failed to delete rate.");
    },
  });

  return {
    rates: data?.data,
    error,
    isLoading,
    useAddRate,
    useEditRate,
    useDeleteRate,
  };
};
