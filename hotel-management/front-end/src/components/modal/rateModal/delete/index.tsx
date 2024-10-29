/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Text, ModalFooter, ModalBody } from "@chakra-ui/react";
import withModal from "../../modalHoc";
import Button from "../../../button";
import { deleteRate } from "../../../../services/rateServices";

interface DeleteRateProps {
  rateId: string;
  onClose: () => void;
}

const DeleteRate = ({ rateId, onClose }: DeleteRateProps) => {
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      console.log("Attempting to delete rate with ID:", rateId);
      await deleteRate(rateId);
      console.log("Rate deleted successfully");
      onClose();
    } catch (error) {
      console.error("Deletion error:", error);
      setError("This rate is associated with existing rooms.");
    }
  };

  return (
    <>
      <ModalBody>
        <Text>Are you sure you want to delete rate {} ?</Text>
        {error && <Text color="red.500">{error}</Text>}
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose} text={"Cancel"} buttonType={"cancelButton"} />
        <Button
          onClick={handleDelete}
          text="Confirm Delete"
          buttonType="deleteButton"
        />
      </ModalFooter>
    </>
  );
};

export default withModal(DeleteRate, "Delete");
