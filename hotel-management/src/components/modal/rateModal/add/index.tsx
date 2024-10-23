import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Select,
  Textarea,
} from "@chakra-ui/react";

interface AddRoomModalProps {
  onClose: () => void;
  onAddRoom: (roomData: any) => void;
}

export default function AddRoomModal({
  onClose,
  onAddRoom,
}: AddRoomModalProps) {
  const [bedType, setBedType] = useState("");
  const [floor, setFloor] = useState("");
  const [status, setStatus] = useState("");
  const [facilityDescription, setFacilityDescription] = useState("");

  const handleSubmit = () => {
    if (!bedType || !floor || !status) {
      alert("Please fill in all required fields.");
      return;
    }

    const newRoomData = { bedType, floor, status, facilityDescription };
    onAddRoom(newRoomData);
    onClose();
  };

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Room</ModalHeader>
        <ModalBody>
          <FormControl mb={4}>
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
          <FormControl mb={4}>
            <FormLabel>Room Floor</FormLabel>
            <Select value={floor} onChange={(e) => setFloor(e.target.value)}>
              <option value="">Select floor</option>
              <option value="Ground Floor">Ground Floor</option>
              <option value="1st Floor">1st Floor</option>
              <option value="2nd Floor">2nd Floor</option>
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Status</FormLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Select status</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Under Maintenance">Under Maintenance</option>
              <option value="Out of Order">Out of Order</option>
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Room Facility</FormLabel>
            <Textarea
              value={facilityDescription}
              onChange={(e) => setFacilityDescription(e.target.value)}
              maxLength={500}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
