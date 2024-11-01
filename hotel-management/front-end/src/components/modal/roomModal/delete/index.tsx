/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { deleteRoom } from "../../../../services/roomService";
import Spinner from "../../../spinner";
import React from "react";
import Button from "../../../button";

interface DeleteRoomProps {
  roomId: string;
  onDeleteRoom: (roomId: string) => void;
}

const DeleteRoom = ({ roomId, onDeleteRoom }: DeleteRoomProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      <Button
        onClick={onOpen}
        text="Delete"
        buttonType="first"
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="white.200">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Room
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this room?{" "}
              {error && <Text color="red.500">{error}</Text>}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                text="Cancel"
                onClick={onClose}
                buttonType="cancelButton"
              />
              {loading ? (
                <Spinner />
              ) : (
                <Button
                  text="Confirm Delete"
                  buttonType="deleteButton"
                  onClick={handleDelete}
                  ml={3}
                />
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteRoom;
