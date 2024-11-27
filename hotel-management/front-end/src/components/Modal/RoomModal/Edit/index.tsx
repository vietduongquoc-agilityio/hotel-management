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
import { useState } from "react";

// Constants
import {
  roomFloorOptions,
  roomStatusColors,
  roomStatusOptions,
} from "@/constants";

// Interface
import { RoomData } from "@/interfaces";

// Store
import { useRateStore } from "@/stores";

// Components
import { Button, Spinner, withModal } from "@/components";

interface EditRoomModalProps {
  onClose: () => void;
  onEditRoom: (roomData: RoomData) => void;
  initialRoomData: RoomData;
}

const EditRoomModal = ({
  initialRoomData,
  onClose,
  onEditRoom,
}: EditRoomModalProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: initialRoomData,
  });

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const bedTypeOptions = useRateStore((state) => state.bedTypeOptions);

  const onSubmit = async (data: RoomData) => {
    setIsLoading(true);
    try {
      await onEditRoom(data);

      if (onClose) onClose();
    } catch {
      toast({
        title: "Failed to update room.",
        description: "An error occurred while updating the room.",
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
            defaultValue={initialRoomData.bedType}
            {...register("bedType")}
          >
            {bedTypeOptions.map((option, index) => (
              <option key={`${option.value}-${index}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          {errors.bedType && (
            <p style={{ color: "red" }}>{errors.bedType.message}</p>
          )}
        </FormControl>

        <FormControl mb={4} maxW="320px" isInvalid={!!errors.roomFloor}>
          <FormLabel>Room Floor</FormLabel>
          <Select
            defaultValue={initialRoomData.roomFloor}
            {...register("roomFloor")}
          >
            {roomFloorOptions.map((option, index) => (
              <option
                key={`${option.value}-${index}`}
                value={option.value}
                style={{
                  color:
                    roomStatusColors[
                      option.value as keyof typeof roomStatusColors
                    ],
                }}
              >
                {option.label}
              </option>
            ))}
          </Select>
          {errors.roomFloor && (
            <p style={{ color: "red" }}>{errors.roomFloor.message}</p>
          )}
        </FormControl>
      </Box>

      <FormControl mb={4} isInvalid={!!errors.roomFacility}>
        <FormLabel>Room Facility</FormLabel>
        <Textarea
          defaultValue={initialRoomData.roomFacility}
          maxLength={500}
          {...register("roomFacility")}
        />
        {errors.roomFacility && (
          <p style={{ color: "red" }}>{errors.roomFacility.message}</p>
        )}
      </FormControl>

      <FormControl mb={4} isInvalid={!!errors.roomStatus}>
        <FormLabel>Status</FormLabel>
        <Select
          defaultValue={initialRoomData.roomStatus}
          {...register("roomStatus")}
        >
          {roomStatusOptions.map((option, index) => (
            <option key={`${option.value}-${index}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        {errors.roomStatus && (
          <p style={{ color: "red" }}>{errors.roomStatus.message}</p>
        )}
      </FormControl>

      <ModalFooter>
        <Button onClick={onClose} text="Cancel" buttonType="warning" />
        <Button
          isLoading={isLoading}
          type="submit"
          text="Edit"
          buttonType="primary"
        />
      </ModalFooter>
    </form>
  );
};

export default withModal(EditRoomModal, "Edit");
