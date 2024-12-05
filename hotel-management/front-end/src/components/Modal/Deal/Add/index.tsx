import {
  FormControl,
  FormLabel,
  Select,
  ModalFooter,
  Box,
} from "@chakra-ui/react";

// Components
import { withModal, Input, Button } from "@/components";

interface AddDealModalProps {
  onClose: () => void;
  width: string
}

const AddDealModal = ({ onClose }: AddDealModalProps) => {
  return (
    <form >
      <Box display="flex" justifyContent="space-between">
        <FormControl mb={4} maxW="320px">
          <FormLabel>Deal Name</FormLabel>
          <Input placeHolder="Enter deal name" inputType="primary" />
        </FormControl>

        <FormControl mb={4} maxW="320px">
          <FormLabel>Reference Number</FormLabel>
          <Input placeHolder="Enter reference number" inputType="primary" />
        </FormControl>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <FormControl mb={4} maxW="320px">
          <FormLabel>Start Date</FormLabel>
          <Input type="date" placeHolder={""} inputType="number" />
        </FormControl>

        <FormControl mb={4} maxW="320px">
          <FormLabel>End Date</FormLabel>
          <Input type="date" placeHolder="" inputType="number" />
        </FormControl>
      </Box>
      <FormControl mb={4} maxW="320px">
        <FormLabel>Room Type</FormLabel>
        <Select placeholder="Select room type"></Select>
      </FormControl>

      <ModalFooter>
        <Button text="Cancel" buttonType="warning" onClick={onClose} />
        <Button w="100px" text="Add Deal" buttonType="primary" />
      </ModalFooter>
    </form>
  );
};

export default withModal(AddDealModal, "Add Deal");
