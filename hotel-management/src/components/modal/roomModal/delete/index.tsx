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

interface DeleteRoomProps {
  room: { id: string; roomNumber: string };
  onClose: () => void;
}

const DeleteRoom: React.FC<DeleteRoomProps> = ({
  room = { id: "", roomNumber: "" },
  onClose,
}) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="white.200">
        <ModalHeader>Delete Room</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to delete room {room.roomNumber}?</Text>
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

export default withModal(DeleteRoom, "Delete");
