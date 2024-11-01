/* eslint-disable react-refresh/only-export-components */
import {
  bedTypeOptions,
  roomFloorOptions,
  roomStatusOptions,
} from "../../../constants/selectOptions/selectOption";
import { useState } from "react";
import withModal from "../../modalHoc";
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
import Button from "../../../button";
import Spinner from "../../../spinner";
import { RoomData } from "../../../constants/interfaceTypes/roomTypes";

interface EditRoomModalProps {
  onClose?: () => void;
  onEditRoom?: (roomData: RoomData) => void;
  initialRoomData: RoomData;
}

const EditRoomModal = ({ initialRoomData, onClose }: EditRoomModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialRoomData,
  });

  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const onSubmit = async () => {
    setLoading(true);
    try {
      toast({
        title: "Room updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed to update room.",
        description: "An error occurred while updating the room.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error updating room:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" justifyContent="space-between">
        <FormControl mb={4} maxW="320px" isInvalid={!!errors.bedType}>
          <FormLabel>Bed Type</FormLabel>
          <Select value={initialRoomData.bedType}>
            {bedTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
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
          <Select value={initialRoomData.roomFloor}>
            {roomFloorOptions.map((option) => (
              <option key={option.value} value={option.value}>
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
          {...register("roomFacility")}
          placeholder="Enter a description...."
          maxLength={500}
        />
        {errors.roomFacility && (
          <p style={{ color: "red" }}>{errors.roomFacility.message}</p>
        )}
      </FormControl>

      <FormControl mb={4} isInvalid={!!errors.roomStatus}>
        <FormLabel>Status</FormLabel>
        <Select value={initialRoomData.roomStatus}>
          {roomStatusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        {errors.roomStatus && (
          <p style={{ color: "red" }}>{errors.roomStatus.message}</p>
        )}
      </FormControl>

      <ModalFooter>
        <Button onClick={onClose} text="Cancel" buttonType="cancelButton" />
        {loading ? (
          <Spinner />
        ) : (
          <Button type="submit" text="Edit" buttonType="first" />
        )}
      </ModalFooter>
    </form>
  );
};

export default withModal(EditRoomModal, "Edit");
