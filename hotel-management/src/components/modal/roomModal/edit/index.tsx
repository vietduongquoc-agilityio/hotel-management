/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
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
  onClose: () => void;
  onEditRoom: (roomData: any) => void;
  initialRoomData: {
    roomNumber: string;
    bedType: string;
    roomFloor: string;
    roomFacility: string;
    status: string;
  };
}

function EditRoomModal({
  initialRoomData = {
    roomNumber: "",
    bedType: "",
    roomFloor: "",
    roomFacility: "",
    status: "",
  },
  onClose,
  onEditRoom,
}: EditRoomModalProps) {
  const [roomNumber, setRoomNumber] = useState(
    initialRoomData.roomNumber || ""
  );
  const [bedType, setBedType] = useState(initialRoomData.bedType || "");
  const [floor, setFloor] = useState(initialRoomData.roomFloor || "");
  const [status, setStatus] = useState(initialRoomData.status || "");
  const [facilityDescription, setFacilityDescription] = useState(
    initialRoomData.roomFacility || ""
  );

  useEffect(() => {
    if (initialRoomData) {
      setRoomNumber(initialRoomData.roomNumber);
      setBedType(initialRoomData.roomNumber || "");
      setFloor(initialRoomData.bedType || "");
      setStatus(initialRoomData.roomFloor || "");
      setFacilityDescription(initialRoomData.roomFacility || "");
    }
  }, [initialRoomData]);

  const handleSubmit = () => {
    const updatedRoomData = {
      roomNumber,
      bedType,
      floor,
      status,
      facilityDescription,
    };
    onEditRoom(updatedRoomData);
    onClose();
  };

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="white.200">
        <ModalHeader>Edit Room {initialRoomData.roomNumber}</ModalHeader>
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
}

export default withModal(EditRoomModal, "Edit");
