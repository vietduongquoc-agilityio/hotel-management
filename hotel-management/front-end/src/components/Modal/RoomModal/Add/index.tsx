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
import { validationRules, roomFloorOptions } from "@/constants";

// InterFace
import { NewRoomData } from "@/interfaces";

// Store
import { useRateStore } from "@/stores";

// Components
import { Button, Spinner, withModal } from "@/components";

interface AddRoomModalProps {
  onClose: () => void;
  onAddRoom: (roomData: NewRoomData) => void;
}

interface FormData {
  bedType: string;
  roomFloor: string;
  roomFacility: string;
}

const AddRoomModal = ({ onClose, onAddRoom }: AddRoomModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const bedTypeOptions = useRateStore((state) => state.bedTypeOptions);
  const rates = useRateStore((state) => state.rates);
  const editRate = useRateStore((state) => state.editRate);

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
        description: "Please select a valid bed type.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const { totalOfRooms, totalOfBooked } = selectedRate;

    if (totalOfBooked === totalOfRooms) {
      toast({
        title: "Room cannot be added",
        description: "Selected room type is fully booked.",
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
      await editRate(documentId, requestPayload);
      toast({
        title: "Room added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch {
      toast({
        title: "Failed to add room.",
        description: "An error occurred while creating the room.",
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
        <FormLabel>Status</FormLabel>
        <Select value="Available" disabled>
          <option value="Available">Available</option>
        </Select>
      </FormControl>

      <ModalFooter>
        <Button onClick={onClose} text="Cancel" buttonType="warning" />
        <Button
          isLoading={isLoading}
          type="submit"
          text="Add"
          buttonType="primary"
        />
      </ModalFooter>
    </form>
  );
};

export default withModal(AddRoomModal, "Add room");
