/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from "react";
import {
  ModalFooter,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";

// Constants
import { RateData } from "../../../../Constants/InterfaceTypes/RateTypes";

// Components
import withModal from "@/components/Modal/ModalHoc";
import Button from "@/components/button/Button";
import Input from "@/components/Input/Input";
import Spinner from "@/components/Spinner/Spinner";

//Services
import { updateRate } from "@/services/rateServices";

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
  const [rooms, setRooms] = useState(initialRateData.availability || "");
  const [price, setPrice] = useState(initialRateData.dealPrice || "");
  const [cancellationPolicy, setCancellationPolicy] = useState(
    initialRateData.cancellationPolicy || ""
  );
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (initialRateData) {
      setRoomType(initialRateData.roomType || "");
      setRooms(initialRateData.availability || "");
      setPrice(initialRateData.dealPrice || "");
      setCancellationPolicy(initialRateData.cancellationPolicy || "");
    }
  }, [initialRateData]);

  const handleSubmit = async () => {
    if (!roomType || !rooms || !price || !cancellationPolicy) {
      toast({
        title: "All fields are required.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const updatedRateData: RateData = {
      ...initialRateData,
      roomType,
      cancellationPolicy,
      availability: rooms,
      dealPrice: price,
      rate: price,
    };

    setLoading(true);
    try {
      await updateRate(initialRateData.documentId, updatedRateData);
      onEditRate(updatedRateData);
      toast({
        title: "Rate updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Failed to update rate.",
        description: "An error occurred while updating the rate.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
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
        {loading ? (
          <Spinner />
        ) : (
          <Button onClick={handleSubmit} text="Edit" buttonType="first" />
        )}
      </ModalFooter>
    </>
  );
};

export default withModal(EditRateModal, "Edit");
