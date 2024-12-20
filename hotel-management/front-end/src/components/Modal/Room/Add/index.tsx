import { useState } from "react";
import {
  ModalFooter,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

// Constants
import {
  validationRules,
  roomFloorOptions,
  ADD_ROOM_MESSAGE,
} from "@/constants";

// InterFace
import { NewRoomData } from "@/interfaces";

// Store
import { useRateStore } from "@/stores";

// Components
import { Button, withModal } from "@/components";

// Hooks
import { useUpdateRate } from "@/hooks";

interface AddRoomModalProps {
  onAddRoom: (roomData: NewRoomData) => void;
  onClose: () => void;
  isDisabled: boolean;
}

interface FormData {
  bedType: string;
  roomFloor: string;
  roomFacility: string;
}

const AddRoomModal = ({ onAddRoom, onClose }: AddRoomModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const bedTypeOptions = useRateStore((state) => state.bedTypeOptions);
  const rates = useRateStore((state) => state.rates);
  const editRate = useUpdateRate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const selectedRate = rates.find((rate) => rate.roomType === data.bedType);

    if (!selectedRate) {
      toast({
        title: "Error",
        description: ADD_ROOM_MESSAGE.ERROR_SELECTED_BED_TYPE,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const { totalOfRooms, totalOfBooked } = selectedRate;

    if (totalOfBooked === totalOfRooms) {
      toast({
        title: ADD_ROOM_MESSAGE.ERROR_FULLY,
        description: ADD_ROOM_MESSAGE.ERROR_FULLY_ERROR_DESCRIPTION,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newRoomData: NewRoomData = {
      roomNumber: "ID",
      bedType: data.bedType,
      roomFloor: data.roomFloor,
      roomFacility: data.roomFacility,
      roomStatus: "Available",
    };

    setIsLoading(true);
    try {
      const { documentId } = selectedRate;
      const requestPayload = {
        roomType: selectedRate.roomType,
        cancellationPolicy: selectedRate.cancellationPolicy,
        dealPrice: selectedRate.dealPrice,
        deals: selectedRate.deals,
        rate: selectedRate.rate,
        totalOfRooms: selectedRate.totalOfRooms,
        totalOfBooked: selectedRate.totalOfBooked + 1,
      };

      await onAddRoom(newRoomData);
      await editRate.mutate({ rateId: documentId, requestPayload });
      toast({
        title: ADD_ROOM_MESSAGE.SUCCESS,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch {
      toast({
        title: ADD_ROOM_MESSAGE.ERROR,
        description: ADD_ROOM_MESSAGE.ERROR_DESCRIPTION,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" justifyContent="space-between">
        <FormControl mb={4} maxW="320px" isInvalid={!!errors.bedType}>
          <FormLabel>Bed Type</FormLabel>
          <Select
            {...register("bedType", validationRules.required)}
            placeholder="Select bed type"
          >
            {bedTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl mb={4} maxW="320px" isInvalid={!!errors.roomFloor}>
          <FormLabel>Room Floor</FormLabel>
          <Select
            {...register("roomFloor", validationRules.required)}
            placeholder="Select floor"
          >
            {roomFloorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>

      <FormControl mt="32px" mb="32px" isInvalid={!!errors.roomFacility}>
        <FormLabel>Room Facility</FormLabel>
        <Textarea
          {...register("roomFacility", validationRules.required)}
          placeholder="AC, shower, Double bed, towel, bathtub, TV"
          maxLength={500}
        />
        {errors.roomFacility && (
          <p style={{ color: "red" }}>{errors.roomFacility.message}</p>
        )}
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Status Room</FormLabel>
        <Select value="Available" disabled>
          <option value="Available">Available</option>
        </Select>
      </FormControl>

      <ModalFooter>
        <Button text="Cancel" buttonType="warning" onClick={onClose} />
        <Button
          isLoading={isLoading}
          type="submit"
          text="Add"
          buttonType="primary"
          w="100px"
        />
      </ModalFooter>
    </form>
  );
};

export default withModal(AddRoomModal, "Add room");
