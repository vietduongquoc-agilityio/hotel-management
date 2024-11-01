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
  useToast,
} from "@chakra-ui/react";
import { deleteRate } from "../../../../services/rateServices";
import Spinner from "../../../spinner";
import React from "react";
import Button from "../../../button";

interface DeleteRateProps {
  rateId: string;
  onDeleteRate: (rateId: string) => void;
}

const DeleteRate = ({ rateId, onDeleteRate }: DeleteRateProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteRate(rateId);
      onDeleteRate(rateId);
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
      <Button onClick={onOpen} text="Delete" buttonType="first"></Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="white.200">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Rate
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this rate?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                text="Cancel"
                buttonType="cancelButton"
                onClick={onClose}
              />
              {loading ? (
                <Spinner />
              ) : (
                <Button
                  onClick={handleDelete}
                  ml={3}
                  text="Confirm Delete"
                  buttonType="deleteButton"
                />
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteRate;
