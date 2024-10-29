/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from "react";
import { ModalFooter, FormControl, FormLabel } from "@chakra-ui/react";
import withModal from "../../modalHoc";
import Button from "../../../button";
import Input from "../../../input";
import { updateRate } from "../../../../services/rateServices";
import RateData from "../../../interfaceTypes/rateTypes";

interface EditRateModalProps {
  onClose: () => void;
  onEditRate: (updatedRateData: RateData) => void;
  initialRateData: RateData;
}

const EditRateModal = ({
  onClose,
  onEditRate,
  initialRateData,
}: EditRateModalProps) => {
  const [roomType, setRoomType] = useState(initialRateData.roomType || "");
  const [rooms, setRooms] = useState(initialRateData.roomType || "");
  const [price, setPrice] = useState(initialRateData.dealPrice || "");
  const [cancellationPolicy, setCancellationPolicy] = useState(
    initialRateData.cancellationPolicy || ""
  );

  useEffect(() => {
    if (initialRateData) {
      setRoomType(initialRateData.roomType || "");
      setRooms(initialRateData.roomType || "");
      setPrice(initialRateData.dealPrice || "");
      setCancellationPolicy(initialRateData.cancellationPolicy || "");
    }
  }, [initialRateData]);

  const handleSubmit = async () => {
    if (!roomType || !rooms || !price || !cancellationPolicy) {
      alert("Please fill in all fields.");
      return;
    }

    const updatedRateData: RateData = {
      roomType,
      cancellationPolicy,
      deals: initialRateData.deals,
      dealPrice: initialRateData.dealPrice,
      rate: initialRateData.rate,
      availability: initialRateData.availability,
      documentId: initialRateData.documentId,
    };

    try {
      await updateRate(initialRateData.documentId, updatedRateData);
      onEditRate(updatedRateData);
      onClose();
    } catch (error) {
      console.error("Error updating rate:", error);
      alert("Failed to update rate. Please try again.");
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
        <Button onClick={handleSubmit} text="Edit" buttonType="first" />
      </ModalFooter>
    </>
  );
};

export default withModal(EditRateModal, "Edit");
