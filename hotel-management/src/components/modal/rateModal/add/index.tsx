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

interface AddRateModalProps {
  onClose: () => void;
  onAddRate: (rateData: any) => void;
}

function AddRateModal({ onClose, onAddRate }: AddRateModalProps) {
  const [rateType, setRateType] = useState("");
  const [deal, setDeal] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState("");

  const handleSubmit = () => {
    if (!rateType || !deal || !price || !availability) {
      alert("Please fill in all fields.");
      return;
    }
    const newRateData = { rateType, deal, price, availability };
    onAddRate(newRateData);
    onClose();
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
              value={rateType}
              onChange={(e) => setRateType(e.target.value)}
              placeHolder={""}
              inputType={"first"}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Deal</FormLabel>
            <Input
              value={deal}
              onChange={(e) => setDeal(e.target.value)}
              placeHolder={""}
              inputType={"first"}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Price</FormLabel>
            <Input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeHolder={""}
              inputType={"first"}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Availability</FormLabel>
            <Input
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              placeHolder={""}
              inputType={"first"}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onClose}
            text={"Cancel"}
            buttonType={"cancelButton"}
          />
          <Button onClick={handleSubmit} text={"Add"} buttonType={"first"} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default withModal(AddRateModal, "Add rate");
