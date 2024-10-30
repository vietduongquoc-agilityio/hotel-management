/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { Text, ModalFooter, ModalBody, useToast } from "@chakra-ui/react";
import withModal from "../../modalHoc";
import Button from "../../../button";
import Spinner from "../../../spinner";
import { deleteRate } from "../../../../services/rateServices";
import { useState } from "react";

interface DeleteRateProps {
  rateId: string;
  onClose: () => void;
  onDeleteRate: (rateId: string) => void;
}

const DeleteRate = ({ rateId, onClose, onDeleteRate }: DeleteRateProps) => {
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
      <ModalBody>
        <Text>Are you sure you want to delete this rate?</Text>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose} text="Cancel" buttonType="cancelButton" />
        {loading ? (
          <Spinner />
        ) : (
          <Button
            onClick={handleDelete}
            text="Confirm Delete"
            buttonType="deleteButton"
          />
        )}
      </ModalFooter>
    </>
  );
};

export default withModal(DeleteRate, "Delete");
