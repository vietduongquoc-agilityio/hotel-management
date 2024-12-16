// Libs
import { useQuery } from "@tanstack/react-query";

// Services
import { getRates } from "@/services";

// Interfaces
import { RateData } from "@/interfaces";

export const useGetRate = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["rates"],
    queryFn: async () => {
      const response = await getRates(1, 10);
      const ratesData = response.data;

      // Transform data to get bedTypeOptions
      const bedTypeOptions = ratesData.map((item: RateData) => ({
        value: item.roomType,
        label: `${item.roomType} Bed`,
      }));

      return { rates: ratesData, bedTypeOptions };
    },
  });

  return { data, isLoading, error, isError };
};
