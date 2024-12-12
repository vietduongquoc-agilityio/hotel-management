import { useState } from "react";
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
import React from "react";

// Components
import { Button } from "@/components";

//Services
import { deleteGuest } from "@/services";

interface DeleteGuestProps {
  guestId: string;
  onDeleteGuest: (guestId: string) => void;
}

const DeleteGuest = ({ guestId, onDeleteGuest }: DeleteGuestProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteGuest(guestId);
      onDeleteGuest(guestId);
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
      <Button onClick={onOpen} text="Delete" buttonType="error"></Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="white.200" top="200px">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Guest
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this guest?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button text="Cancel" buttonType="warning" onClick={onClose} />
              <Button
                isLoading={isLoading}
                onClick={handleDelete}
                ml={3}
                text="Confirm Delete"
                buttonType="error"
              />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteGuest;
