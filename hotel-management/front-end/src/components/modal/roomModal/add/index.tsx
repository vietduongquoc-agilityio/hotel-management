/* eslint-disable react-refresh/only-export-components */
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
import withModal from "../../modalHoc";
import Button from "../../../button";
import Spinner from "../../../spinner";
import { NewRoomData } from "../../../constants/interfaceTypes/roomTypes";
import { createRoom } from "../../../../services/roomService";
import { validationRules } from "../../../constants/validate";
import { bedTypeOptions, roomFloorOptions } from "../../../constants/selectOptions/selectOption";

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
      documentId: "",
      status: ""
    };

    setLoading(true);
    try {
      const createdRoom = await createRoom(newRoomData);
      onAddRoom(createdRoom);
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
