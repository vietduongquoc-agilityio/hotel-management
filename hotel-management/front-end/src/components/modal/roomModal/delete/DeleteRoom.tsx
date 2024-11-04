/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import React from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  Text,
  useToast,
} from "@chakra-ui/react";

// Components
import Spinner from "@/components/Spinner/Spinner";
import Button from "@/components/Button/Button";

//Services
import { deleteRoom } from "@/services/roomService";

interface DeleteRoomProps {
  roomId: string;
  onDeleteRoom: (roomId: string) => void;
}

const DeleteRoom = ({ roomId, onDeleteRoom }: DeleteRoomProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const [error,] = useState("");
  const toast = useToast();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteRoom(roomId);
      onDeleteRoom(roomId);
      toast({
        title: "Rate deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Failed to delete rate.",
        description: "An error occurred while deleting the rate.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={onOpen} text="Delete" buttonType="deleteButton" />

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
