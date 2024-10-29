/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
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
import { deleteRoom } from "../../../../services/roomService";

interface DeleteRoomProps {
  room: { roomId: string; roomNumber: string; status: string };
  onClose: () => void;
  onRoomDeleted: () => void;
}

const DeleteRoom: React.FC<DeleteRoomProps> = ({
  room,
  onClose,
  onRoomDeleted,
}) => {
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (room.status !== "Available") {
      setError("Room must be 'Available' to delete.");
      return;
    }
    try {
      await deleteRoom(room.roomId);
      onRoomDeleted();
      onClose();
    } catch (error) {
      setError("Failed to delete room.");
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="white.200">
        <ModalHeader>Delete Room</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to delete room {room.roomNumber}?</Text>
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

export default withModal(DeleteRoom, "Delete");
