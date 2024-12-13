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

// Constants
import { DELETE_DEAL_MESSAGE } from "@/constants";

// Components
import { Button } from "@/components";

// Services
import { deleteDeal } from "@/services";

interface DeleteDealProps {
  dealId: string;
  onDeleteDeal: (dealId: string) => void;
}

const DeleteDeal = ({ dealId, onDeleteDeal }: DeleteDealProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteDeal(dealId);
      onDeleteDeal(dealId);
      toast({
        title: DELETE_DEAL_MESSAGE.SUCCESS,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch {
      toast({
        title: DELETE_DEAL_MESSAGE.ERROR,
        description: DELETE_DEAL_MESSAGE.ERROR_DESCRIPTION,
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
              {DELETE_DEAL_MESSAGE.TITLE}
            </AlertDialogHeader>

            <AlertDialogBody>
              {DELETE_DEAL_MESSAGE.CONFIRMATION}
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

export default DeleteDeal;
