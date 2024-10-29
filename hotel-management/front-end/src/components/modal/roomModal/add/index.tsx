/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  Box,
} from "@chakra-ui/react";
import withModal from "../../modalHoc";
import Button from "../../../button";
import RoomData from "../../../interfaceTypes/roomTypes";
import { createRoom } from "../../../../services/roomService";

interface AddRoomModalProps {
  onClose: () => void;
  onAddRoom: (roomData: RoomData) => void;
}

const AddRoomModal = ({ onClose, onAddRoom }: AddRoomModalProps) => {
  const [bedType, setBedType] = useState("");
  const [floor, setFloor] = useState("");
  const [roomFacility, setRoomFacility] = useState("");

  const handleSubmit = async () => {
    if (!bedType || !floor) {
      alert("Please fill in all required fields.");
      return;
    }
    const newRoomData: RoomData = {
      bedType,
      roomFloor: floor,
      status: "Available",
      roomFacility,
      documentId: "",
      roomNumber: "",
      available: "",
    };

    try {
      const createdRoom = await createRoom(newRoomData);
      onAddRoom(createdRoom);
      onClose();
    } catch (error) {
      console.error("Failed to create rate:", error);
    }
  };

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="white.200">
        <ModalHeader>Add New Room</ModalHeader>
        <ModalBody bg="white.200">
          <Box display="flex" justifyContent="space-between">
            <FormControl mb={4} maxW="320px">
              <FormLabel>Bed Type</FormLabel>
              <Select
                value={bedType}
                onChange={(e) => setBedType(e.target.value)}
              >
                <option value="">Select bed type</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Queen">Queen</option>
                <option value="King">King</option>
              </Select>
            </FormControl>
            <FormControl mb={4} maxW="320px">
              <FormLabel>Room Floor</FormLabel>
              <Select value={floor} onChange={(e) => setFloor(e.target.value)}>
                <option value="">Select floor</option>
                <option value="2nd Floor">2nd Floor</option>
                <option value="3rd Floor">3rd Floor</option>
                <option value="4th Floor">4th Floor</option>\
                <option value="5th Floor">5th Floor</option>
              </Select>
            </FormControl>
          </Box>
          <FormControl mt="32px" mb="32px">
            <FormLabel>Room Facility</FormLabel>
            <Textarea
              placeholder="AC, shower, Double bed, towel bathtub, TV"
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
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onClose}
            text={"Cancel"}
            buttonType={"cancelButton"}
          />
          <Button onClick={handleSubmit} text={"Add"} buttonType={"first"} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default withModal(AddRoomModal, "Add room");
