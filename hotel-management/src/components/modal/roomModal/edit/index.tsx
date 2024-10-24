/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import withModal from "../../withModal";
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

interface EditRoomModalProps {
  roomData: any;
  onClose: () => void;
  onSaveRoom: (updatedRoomData: any) => void;
}

const EditRoomModal: React.FC<EditRoomModalProps> = ({
  roomData = {},
  onClose,
  onSaveRoom,
}) => {
  const [bedType, setBedType] = useState(roomData.bedType || "");
  const [floor, setFloor] = useState(roomData.floor || "");
  const [status, setStatus] = useState(roomData.status || "");
  const [facilityDescription, setFacilityDescription] = useState(
    roomData.facilityDescription || ""
  );

  const handleSubmit = () => {
    const updatedRoomData = { bedType, floor, status, facilityDescription };
    onSaveRoom(updatedRoomData);
    onClose();
  };

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="white.200">
        <ModalHeader>Edit Room {roomData.roomNumber}</ModalHeader>
        <ModalBody bg="white.200">
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
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Room Facility</FormLabel>
            <Textarea
              placeholder="Enter a description...."
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
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default withModal(EditRoomModal, "Edit");
