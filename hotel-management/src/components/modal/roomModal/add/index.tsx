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
import withModal from "../../withModal";
import Button from "../../../button";

interface AddRoomModalProps {
  onClose: () => void;
  onAddRoom: (roomData: any) => void;
}

const AddRoomModal = ({ onClose, onAddRoom }: AddRoomModalProps) => {
  const [bedType, setBedType] = useState("");
  const [floor, setFloor] = useState("");
  const [facilityDescription, setFacilityDescription] = useState("");

  const handleSubmit = () => {
    if (!bedType || !floor) {
      alert("Please fill in all required fields.");
      return;
    }
    const newRoomData = {
      bedType,
      floor,
      status: "Available",
      facilityDescription,
    };
    onAddRoom(newRoomData);
    onClose();
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
                <option value="Ground Floor">Ground Floor</option>
                <option value="1st Floor">1st Floor</option>
                <option value="2nd Floor">2nd Floor</option>
              </Select>
            </FormControl>
          </Box>
          <FormControl mt="32px" mb="32px">
            <FormLabel>Room Facility</FormLabel>
            <Textarea
              placeholder="Enter a description...."
              value={facilityDescription}
              onChange={(e) => setFacilityDescription(e.target.value)}
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
