/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { Text, ModalFooter, ModalBody } from "@chakra-ui/react";
import withModal from "../../modalHoc";
import Button from "../../../button";
import { deleteRate } from "../../../../services/rateServices";

interface DeleteRateProps {
  rateId: string;
  onClose: () => void;
  onDeleteRate: (rateId: string) => void;
}

const DeleteRate = ({ rateId, onClose, onDeleteRate }: DeleteRateProps) => {
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      await deleteRate(rateId);
      console.log("Rate deleted successfully");
      onDeleteRate(rateId);
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
