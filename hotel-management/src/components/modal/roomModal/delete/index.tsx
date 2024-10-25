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
          <Button
            onClick={onClose}
            text={"Cancel"}
            buttonType={"cancelButton"}
          />
          <Button text={"Confirm Delete"} buttonType={"deleteButton"} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default withModal(DeleteRoom, "Delete");
