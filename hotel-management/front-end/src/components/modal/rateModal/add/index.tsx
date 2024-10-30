/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import {
  ModalFooter,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import withModal from "../../modalHoc";
import Button from "../../../button";
import Input from "../../../input";
import RateData from "../../../interfaceTypes/rateTypes";
import { createRate } from "../../../../services/rateServices";
import Spinner from "../../../spinner";

interface AddRateModalProps {
  onClose: () => void;
  onAddRate: (rateData: RateData) => void;
}

const AddRateModal = ({ onClose, onAddRate }: AddRateModalProps) => {
  const [roomType, setRoomType] = useState("");
  const [cancellationPolicy, setCancellationPolicy] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    if (!roomType || !cancellationPolicy || !price || !availability) {
      toast({
        title: "All fields are required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newRateData: RateData = {
      roomType,
      cancellationPolicy,
      deals: "Family Deal",
      dealPrice: price,
      rate: price,
      availability,
      documentId: "",
    };

    setLoading(true);
    try {
      const createdRate = await createRate(newRateData);
      onAddRate(createdRate);
      toast({
        title: "Rate added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Failed to add rate.",
        description: "An error occurred while creating the rate.",
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
        <FormLabel>Availability Room</FormLabel>
        <Input
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          placeHolder="Enter number of rooms"
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
          <Button onClick={handleSubmit} text="Add" buttonType="first" />
        )}
      </ModalFooter>
    </>
  );
};

export default withModal(AddRateModal, "Add rate");
