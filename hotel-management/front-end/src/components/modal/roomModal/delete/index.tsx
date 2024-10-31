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
  roomId: string;
  onClose: () => void;
  onDeleteRoom: (roomId: string) => void;
}

const DeleteRoom = ({ roomId, onClose, onDeleteRoom }: DeleteRoomProps) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      await deleteRoom(roomId);
      onDeleteRoom(roomId);
      onClose();
    } catch (error) {
      setError("Failed to delete room.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ModalHeader>Delete Room</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>Are you sure you want to delete this room?</Text>
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
