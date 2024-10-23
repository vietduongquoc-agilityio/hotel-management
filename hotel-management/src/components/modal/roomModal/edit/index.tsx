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

interface EditRoomProps {
  room: { id: string; roomNumber: string };
  onClose: () => void;
}

export default function EditRoom({ room, onClose }: EditRoomProps) {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Room</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Edit Room {room.roomNumber}</Text>
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
