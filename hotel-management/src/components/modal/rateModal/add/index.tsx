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
} from "@chakra-ui/react";
import withModal from "../../withModal";
import Button from "../../../button";
import Input from "../../../input";
import RateData from "../../../interfaceTypes/rateTypes";
import { createRate } from "../../../../services/rateServices";

interface AddRateModalProps {
  onClose: () => void;
  onAddRate: (rateData: RateData) => void;
}

function AddRateModal({ onClose, onAddRate }: AddRateModalProps) {
  const [roomType, setRoomType] = useState("");
  const [cancellationPolicy, setCancellationPolicy] = useState("");
  const [rooms, setRooms] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async () => {
    if (!roomType || !rooms || !price || !cancellationPolicy) {
      alert("Please fill in all fields.");
      return;
    }

    const newRateData: RateData = {
      id: "",
      roomType,
      cancellationPolicy,
      deals: "Family Deal",
      dealPrice: price,
      rate: price,
      availability: "Available",
    };

    try {
      const createdRate = await createRate(newRateData);
      onAddRate(createdRate);
      onClose();
    } catch (error) {
      console.error("Failed to create rate:", error);
    }
  };

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="white.200">
        <ModalHeader>Add New Rate</ModalHeader>
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Rate Type</FormLabel>
            <Input
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              placeHolder="Enter room type"
              inputType="first"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Cancellation Policy</FormLabel>
            <Input
              value={cancellationPolicy}
              onChange={(e) => setCancellationPolicy(e.target.value)}
              placeHolder="Enter cancellation policy"
              inputType="first"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Rooms</FormLabel>
            <Input
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              placeHolder="Enter total number of rooms"
              inputType="first"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Price</FormLabel>
            <Input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeHolder="Enter room price"
              inputType="first"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} text="Cancel" buttonType="cancelButton" />
          <Button onClick={handleSubmit} text="Add" buttonType="first" />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default withModal(AddRateModal, "Add rate");
