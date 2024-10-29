/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { ModalFooter, FormControl, FormLabel } from "@chakra-ui/react";
import withModal from "../../modalHoc";
import Button from "../../../button";
import Input from "../../../input";
import RateData from "../../../interfaceTypes/rateTypes";
import { createRate } from "../../../../services/rateServices";

interface AddRateModalProps {
  onClose: () => void;
  onAddRate: (rateData: RateData) => void;
}

const AddRateModal = ({ onClose, onAddRate }: AddRateModalProps) => {
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
      roomType,
      cancellationPolicy,
      deals: "Family Deal",
      dealPrice: price,
      rate: price,
      availability: "Available",
      documentId: "",
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
    <>
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

      <ModalFooter>
        <Button onClick={onClose} text="Cancel" buttonType="cancelButton" />
        <Button onClick={handleSubmit} text="Add" buttonType="first" />
      </ModalFooter>
    </>
  );
};

export default withModal(AddRateModal, "Add rate");
