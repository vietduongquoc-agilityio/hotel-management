/* eslint-disable react-refresh/only-export-components */
import {
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import withModal from "../../withModal";

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
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" ml={3}>
            Confirm Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default withModal(DeleteRate, "Delete");
