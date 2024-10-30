/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import withModal from "../../modalHoc";
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
  useToast,
} from "@chakra-ui/react";
import Button from "../../../button";
import Spinner from "../../../spinner";

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

const EditRoomModal = ({
  initialRoomData = {
    roomNumber: "",
    bedType: "",
    roomFloor: "",
    roomFacility: "",
    status: "",
  },
  onClose,
  onEditRoom,
}: EditRoomModalProps) => {
  const [roomNumber, setRoomNumber] = useState(initialRoomData.roomNumber || "");
  const [bedType, setBedType] = useState(initialRoomData.bedType || "");
  const [floor, setFloor] = useState(initialRoomData.roomFloor || "");
  const [status, setStatus] = useState(initialRoomData.status || "");
  const [facilityDescription, setFacilityDescription] = useState(initialRoomData.roomFacility || "");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setRoomNumber(initialRoomData.roomNumber);
    setBedType(initialRoomData.bedType);
    setFloor(initialRoomData.roomFloor);
    setStatus(initialRoomData.status);
    setFacilityDescription(initialRoomData.roomFacility);
  }, [initialRoomData]);

  const handleSubmit = async () => {
    if (!bedType || !floor || !status || !facilityDescription) {
      toast({
        title: "All fields are required.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const updatedRoomData = {
      roomNumber,
      bedType,
      roomFloor: floor,
      status,
      roomFacility: facilityDescription,
    };

    setLoading(true);
    try {
      await onEditRoom(updatedRoomData);
      toast({
        title: "Room updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
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
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="white.200">
        <ModalHeader>Edit Room {initialRoomData.roomNumber}</ModalHeader>
        <ModalBody bg="white.200">
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
              <Select value={floor} onChange={(e) => setFloor(e.target.value)}>
                <option value="">Select floor</option>
                <option value="2nd Floor">2nd Floor</option>
                <option value="3rd Floor">3rd Floor</option>
                <option value="4th Floor">4th Floor</option>
                <option value="5th Floor">5th Floor</option>
              </Select>
            </FormControl>
          </Box>
          <FormControl mb={4}>
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
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Select status</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Under Maintenance">Under Maintenance</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} text={"Cancel"} buttonType={"cancelButton"} />
          {loading ? (
            <Spinner />
          ) : (
            <Button onClick={handleSubmit} text={"Edit"} buttonType={"first"} />
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default withModal(EditRoomModal, "Edit");
