/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from "react";
import { ModalFooter, FormControl, FormLabel } from "@chakra-ui/react";
import withModal from "../../modalHoc";
import Button from "../../../button";
import Input from "../../../input";

interface EditRateModalProps {
  onClose: () => void;
  onEditRate: (rateData: any) => void;
  initialRateData: {
    roomType: string;
    rooms: string;
    price: string;
    cancellationPolicy: string;
  };
}

const EditRateModal = ({
  onClose,
  onEditRate,
  initialRateData = {
    roomType: "",
    rooms: "",
    price: "",
    cancellationPolicy: "",
  },
}: EditRateModalProps) => {
  const [roomType, setRoomType] = useState(initialRateData.roomType || "");
  const [rooms, setRooms] = useState(initialRateData.rooms || "");
  const [price, setPrice] = useState(initialRateData.price || "");
  const [cancellationPolicy, setCancellationPolicy] = useState(
    initialRateData.cancellationPolicy || ""
  );

  useEffect(() => {
    if (initialRateData) {
      setRoomType(initialRateData.roomType || "");
      setRooms(initialRateData.rooms || "");
      setPrice(initialRateData.price || "");
      setCancellationPolicy(initialRateData.cancellationPolicy || "");
    }
  }, [initialRateData]);

  const handleSubmit = () => {
    if (!roomType || !rooms || !price || !cancellationPolicy) {
      alert("Please fill in all fields.");
      return;
    }
    const updatedRateData = { roomType, rooms, price, cancellationPolicy };
    onEditRate(updatedRateData);
    onClose();
  };

  return (
    <>
      <FormControl mb={4}>
        <FormLabel>Rate Type</FormLabel>
        <Input
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          placeHolder={"Enter room type"}
          inputType={"first"}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Cancellation Policy</FormLabel>
        <Input
          value={cancellationPolicy}
          onChange={(e) => setCancellationPolicy(e.target.value)}
          placeHolder={"Enter cancellation policy"}
          inputType={"first"}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Rooms</FormLabel>
        <Input
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
          placeHolder={"Enter total number of rooms"}
          inputType={"first"}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Price</FormLabel>
        <Input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeHolder={"Enter room price"}
          inputType={"first"}
        />
      </FormControl>
      <ModalFooter>
        <Button onClick={onClose} text={"Cancel"} buttonType={"cancelButton"} />
        <Button onClick={handleSubmit} text={"Edit"} buttonType={"first"} />
      </ModalFooter>
    </>
  );
};

export default withModal(EditRateModal, "Edit");
