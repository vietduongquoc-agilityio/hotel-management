import { useQuery,useMutation, useQueryClient  } from "@tanstack/react-query";
import { getRates, createRateApi, updateRate, deleteRate } from "@/services";
import { useRateStore } from "@/stores";

export const useRate = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["rates"],
    queryFn: async () => {
      return await getRates(1, 10);
    },
  });
  const { saveRate } = useRateStore();
  saveRate(data);
  return { isPending, isError, data, error };
};

export const useAddRate = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["rates"],
    queryFn: async () => {
      return await createRateApi();
    },
  });
  return { isPending, isError, data, error };
};

export const useEditRate = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["rates"],
    queryFn: async () => {
      return await updateRate();
    },
  });
  return { isPending, isError, data, error };
};

export const useDeleteRate = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["rates"],
    queryFn: async () => {
      return await deleteRate();
    },
  });
  return { isPending, isError, data, error };
};
