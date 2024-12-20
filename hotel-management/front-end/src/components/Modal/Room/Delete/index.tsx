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

// Constants
import { DELETE_ROOM_MESSAGE } from "@/constants";

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
        title: DELETE_ROOM_MESSAGE.SUCCESS,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch {
      toast({
        title: DELETE_ROOM_MESSAGE.ERROR,
        description: DELETE_ROOM_MESSAGE.ERROR_DESCRIPTION,
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
              {DELETE_ROOM_MESSAGE.TITLE}
            </AlertDialogHeader>

            <AlertDialogBody>
              {DELETE_ROOM_MESSAGE.CONFIRMATION}
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
