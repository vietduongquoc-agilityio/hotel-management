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

interface AddRoomModalProps {
  onClose: () => void;
  onAddRoom: (roomData: RoomData) => void;
}

const AddRoomModal = ({ onClose, onAddRoom }: AddRoomModalProps) => {
  const [bedType, setBedType] = useState("");
  const [roomFloor, setRoomFloor] = useState("");
  const [roomFacility, setRoomFacility] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    if (!bedType || !roomFloor || !roomFacility) {
      toast({
        title: "All fields are required.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const newRoomData: RoomData = {
      bedType,
      roomFloor,
      roomStatus: "Available",
      roomFacility,
      documentId: "",
      roomNumber: "",
      // available: "",
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
    <>
      <Box display="flex" justifyContent="space-between">
        <FormControl mb={4} maxW="320px">
          <FormLabel>Bed Type</FormLabel>
          <Select value={bedType} onChange={(e) => setBedType(e.target.value)}>
            <option value="">Select bed type</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Queen">Queen</option>
            <option value="King">King</option>
          </Select>
        </FormControl>
        <FormControl mb={4} maxW="320px">
          <FormLabel>Room Floor</FormLabel>
          <Select
            value={roomFloor}
            onChange={(e) => setRoomFloor(e.target.value)}
          >
            <option value="">Select floor</option>
            <option value="2nd Floor">2nd Floor</option>
            <option value="3rd Floor">3rd Floor</option>
            <option value="4th Floor">4th Floor</option>
            <option value="5th Floor">5th Floor</option>
          </Select>
        </FormControl>
      </Box>
      <FormControl mt="32px" mb="32px">
        <FormLabel>Room Facility</FormLabel>
        <Textarea
          placeholder="AC, shower, Double bed, towel, bathtub, TV"
          value={roomFacility}
          onChange={(e) => setRoomFacility(e.target.value)}
          maxLength={500}
        />
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
