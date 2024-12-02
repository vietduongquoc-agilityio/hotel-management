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
  useToast,
} from "@chakra-ui/react";

// Components
import { Button } from "@/components";

//Services
import { deleteRoom } from "@/services";

interface DeleteRoomProps {
  roomId: string;
  onDeleteRoom: (roomId: string) => void;
}

const DeleteRoom = ({ roomId, onDeleteRoom }: DeleteRoomProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleDelete = async () => {
    setIsLoading(true);
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
    } catch {
      toast({
        title: "Failed to delete rate.",
        description: "An error occurred while deleting the rate.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={onOpen} text="Delete" buttonType="error" />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="white.200" top="200px">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Room
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this room?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button text="Cancel" onClick={onClose} buttonType="warning" />
              <Button
                isLoading={isLoading}
                text="Confirm Delete"
                buttonType="error"
                onClick={handleDelete}
                ml={3}
              />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteRoom;
