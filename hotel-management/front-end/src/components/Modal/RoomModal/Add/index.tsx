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
import { validationRules } from "@/constant/Validate";
import {
  roomFloorOptions,
} from "@/constant/SelectOptions";

// InterFace
import { NewRoomData } from "@/interfaces/Room";

// Store
import { useRateStore } from "@/store/RateStore";

// Components
import withModal from "@/components/Modal/modalHoc";
import Button from "@/components/Button";
import Spinner from "@/components/Spinner";

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
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const bedTypeOptions = useRateStore((state) => state.bedTypeOptions);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const newRoomData: NewRoomData = {
      roomNumber: "ID",
      bedType: data.bedType,
      roomFloor: data.roomFloor,
      roomFacility: data.roomFacility,
      roomStatus: "Available",
    };

    setLoading(true);
    try {
      await onAddRoom(newRoomData);
      toast({
        title: "Room added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Failed to add room.",
        description: "An error occurred while creating the room.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Failed to create room:", error);
    } finally {
      setLoading(false);
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
        <Button onClick={onClose} text="Cancel" buttonType="cancelButton" />
        {loading ? (
          <Spinner />
        ) : (
          <Button type="submit" text="Add" buttonType="first" />
        )}
      </ModalFooter>
    </form>
  );
};

export default withModal(AddRoomModal, "Add room");
