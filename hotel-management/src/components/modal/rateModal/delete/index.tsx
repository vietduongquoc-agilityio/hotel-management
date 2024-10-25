/* eslint-disable react-refresh/only-export-components */
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

interface DeleteRateProps {
  rate: { id: string; rateNumber: string };
  onClose: () => void;
}

const DeleteRate: React.FC<DeleteRateProps> = ({
  rate = { id: "", rateNumber: "" },
  onClose,
}) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="white.200">
        <ModalHeader>Delete Rate</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to delete rate {rate.rateNumber}?</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onClose}
            text={"Cancel"}
            buttonType={"cancelButton"}
          />
          <Button
            text={"Confirm Delete"}
            buttonType={"deleteButton"}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default withModal(DeleteRate, "Delete");
