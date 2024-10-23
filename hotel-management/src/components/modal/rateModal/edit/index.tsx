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

interface EditRateProps {
  rate: { id: string; rateNumber: string };
  onClose: () => void;
}

export default function EditRate({ rate, onClose }: EditRateProps) {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Rate</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Edit Rate {rate.rateNumber}</Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
