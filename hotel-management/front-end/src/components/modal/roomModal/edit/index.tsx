/* eslint-disable react-refresh/only-export-components */
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
import RoomData from "../../../constants/interfaceTypes/roomTypes";

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

  console.log("initialRoomData", initialRoomData);

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
          <Select {...register("bedType")}>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Queen">Queen</option>
            <option value="King">King</option>
          </Select>
          {errors.bedType && (
            <p style={{ color: "red" }}>{errors.bedType.message}</p>
          )}
        </FormControl>

        <FormControl mb={4} maxW="320px" isInvalid={!!errors.roomFloor}>
          <FormLabel>Room Floor</FormLabel>
          <Select {...register("roomFloor")} placeholder="Select floor">
            <option value="2nd Floor">2nd Floor</option>
            <option value="3rd Floor">3rd Floor</option>
            <option value="4th Floor">4th Floor</option>
            <option value="5th Floor">5th Floor</option>
          </Select>
          {errors.roomFloor && (
            <p style={{ color: "red" }}>{errors.roomFloor.message}</p>
          )}
        </FormControl>
      </Box>

      <FormControl mb={4} isInvalid={!!errors.roomFacility}>
        <FormLabel>Room Facility</FormLabel>
        <Textarea
          {...register("roomFacility", {
            required: "Room facility is required",
          })}
          placeholder="Enter a description...."
          maxLength={500}
        />
        {errors.roomFacility && (
          <p style={{ color: "red" }}>{errors.roomFacility.message}</p>
        )}
      </FormControl>

      <FormControl mb={4} isInvalid={!!errors.status}>
        <FormLabel>Status</FormLabel>
        <Select
          {...register("status", { required: "Room status is required" })}
          placeholder="Select status"
        >
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
          <option value="Under Maintenance">Under Maintenance</option>
        </Select>
        {errors.status && (
          <p style={{ color: "red" }}>{errors.status.message}</p>
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
