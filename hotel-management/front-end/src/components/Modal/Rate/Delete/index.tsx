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
import { deleteRate } from "@/services";
import { DELETE_RATE_MESSAGE } from "@/constants";

interface DeleteRateProps {
  rateId: string;
  onDeleteRate: (rateId: string) => void;
}

const DeleteRate = ({ rateId, onDeleteRate }: DeleteRateProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteRate(rateId);
      onDeleteRate(rateId);
      toast({
        title: DELETE_RATE_MESSAGE.SUCCESS,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch {
      toast({
        title: DELETE_RATE_MESSAGE.ERROR,
        description: DELETE_RATE_MESSAGE.ERROR_DESCRIPTION,
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
              {DELETE_RATE_MESSAGE.TITLE}
            </AlertDialogHeader>

            <AlertDialogBody>
              {DELETE_RATE_MESSAGE.CONFIRMATION}
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

export default DeleteRate;
