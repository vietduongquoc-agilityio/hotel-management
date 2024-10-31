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
import withModal from "../../modalHoc";
import Button from "../../../button";
import Spinner from "../../../spinner";
import RoomData from "../../../interfaceTypes/roomTypes";
import { createRoom } from "../../../../services/roomService";
import useFormValidation from "../../../validate";

interface AddRoomModalProps {
  onClose: () => void;
  onAddRoom: (roomData: RoomData) => void;
}

const AddRoomModal = ({ onClose, onAddRoom }: AddRoomModalProps) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const [formData, setFormData] = useState({
    bedType: "",
    roomFloor: "",
    roomFacility: "",
  });

  const { errors, validate } = useFormValidation(formData);

  const handleSubmit = async () => {
    const { isValid } = validate(formData, [
      "bedType",
      "roomFloor",
      "roomFacility",
    ]);

    if (!isValid) return;

    const newRoomData: RoomData = {
      roomNumber: "ID",
      bedType: formData.bedType,
      roomFloor: formData.roomFloor,
      roomFacility: formData.roomFacility,
      roomStatus: "Available",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validate({ ...formData, [name]: value }, [name]);
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <FormControl mb={4} maxW="320px">
          <FormLabel>Bed Type</FormLabel>
          <Select
            name="bedType"
            value={formData.bedType}
            onChange={handleChange}
            placeholder="Select bed type"
          >
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Queen">Queen</option>
            <option value="King">King</option>
          </Select>
          {errors.bedType && <p style={{ color: "red" }}>{errors.bedType}</p>}
        </FormControl>
        <FormControl mb={4} maxW="320px">
          <FormLabel>Room Floor</FormLabel>
          <Select
            name="roomFloor"
            value={formData.roomFloor}
            onChange={handleChange}
            placeholder="Select floor"
          >
            <option value="2nd Floor">2nd Floor</option>
            <option value="3rd Floor">3rd Floor</option>
            <option value="4th Floor">4th Floor</option>
            <option value="5th Floor">5th Floor</option>
          </Select>
          {errors.roomFloor && (
            <p style={{ color: "red" }}>{errors.roomFloor}</p>
          )}
        </FormControl>
      </Box>
      <FormControl mt="32px" mb="32px">
        <FormLabel>Room Facility</FormLabel>
        <Textarea
          name="roomFacility"
          placeholder="AC, shower, Double bed, towel, bathtub, TV"
          value={formData.roomFacility}
          onChange={handleChange}
          maxLength={500}
        />
        {errors.roomFacility && (
          <p style={{ color: "red" }}>{errors.roomFacility}</p>
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
          <Button onClick={handleSubmit} text="Add" buttonType="first" />
        )}
      </ModalFooter>
    </>
  );
};

export default withModal(AddRoomModal, "Add room");
