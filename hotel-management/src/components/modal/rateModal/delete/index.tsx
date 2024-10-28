/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import withModal from "../../withModal";
import Button from "../../../button";
import { deleteRate } from "../../../../services/rateServices";

interface DeleteRateProps {
  rate: { id: string };
  onClose: () => void;
  onRateDeleted: () => void;
}

const DeleteRate: React.FC<DeleteRateProps> = ({
  rate,
  onClose,
  onRateDeleted,
}) => {
  const [error, setError] = useState("");
  console.log("rate.id", rate.id);

  const handleDelete = async () => {
    try {
      await deleteRate(rate.id);
      onRateDeleted();
      onClose();
    } catch (error) {
      setError("This rate is associated with existing rooms.");
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="white.200">
        <ModalHeader>Delete Rate</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to delete rate {rate.id}?</Text>
          {error && <Text color="red.500">{error}</Text>}
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onClose}
            text={"Cancel"}
            buttonType={"cancelButton"}
          />
          <Button
            onClick={handleDelete}
            text={"Confirm Delete"}
            buttonType={"deleteButton"}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default withModal(DeleteRate, "Delete");
