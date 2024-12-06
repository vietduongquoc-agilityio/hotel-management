import { useQuery } from "@tanstack/react-query";
import { getRates } from "@/services";

export const useRate = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["rates"],
    queryFn: async () => {
      return await getRates(1, 10);
    },
  });
  return { isPending, isError, data, error };
};
