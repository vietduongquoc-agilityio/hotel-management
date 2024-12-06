import { useGuestStore } from "@/stores";

export const useGuest = () => {
  const {
    guests,
    totalGuests,
    isLoading,
    error,
    fetchGuests,
    createGuest,
    updateGuest,
    deleteGuest,
  } = useGuestStore();

  return {
    guests,
    totalGuests,
    isLoading,
    error,
    fetchGuests,
    createGuest,
    updateGuest,
    deleteGuest,
  };
};
