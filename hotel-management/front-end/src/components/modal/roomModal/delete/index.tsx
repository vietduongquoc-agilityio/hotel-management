/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import {
  Text,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import withModal from "../../modalHoc";
import Button from "../../../button";
import { deleteRoom } from "../../../../services/roomService";
import Spinner from "../../../spinner";

interface DeleteRoomProps {
  room: { roomId: string; roomNumber: string; status: string };
  onClose: () => void;
  onRoomDeleted: () => void;
}

const DeleteRoom = ({ room, onClose, onRoomDeleted }: DeleteRoomProps) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
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
    } finally {
      setLoading(true);
    }
  };

  return (
    <>
      <ModalHeader>Delete Room</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>Are you sure you want to delete room {room.roomNumber}?</Text>
        {error && <Text color="red.500">{error}</Text>}
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose} text={"Cancel"} buttonType={"cancelButton"} />
        {loading ? (
          <Spinner />
        ) : (
          <Button
            onClick={handleDelete}
            text={"Confirm Delete"}
            buttonType={"deleteButton"}
          />
        )}
      </ModalFooter>
    </>
  );
};

export default withModal(DeleteRoom, "Delete");
