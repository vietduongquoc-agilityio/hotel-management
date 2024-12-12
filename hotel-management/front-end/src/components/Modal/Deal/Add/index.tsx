import { useForm } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import {
  FormControl,
  FormLabel,
  Select,
  ModalFooter,
  Box,
  useToast,
} from "@chakra-ui/react";

// Components
import { withModal, Input, Button } from "@/components";

// Constants
import { validationRules } from "@/constants";

// InterFace
import { NewDealData } from "@/interfaces";

// Stores
import { useRateStore } from "@/stores";

interface AddDealModalProps {
  onAddDeal: (dealData: NewDealData) => void;
  onClose: () => void;
  width: string;
  handleSelectedBedType: (event: ChangeEvent<HTMLSelectElement>) => void;
}

interface FormData {
  dealName: string;
  roomType: string;
  referenceNumber: number;
  startDate: Date;
  endDate: Date;
}

const AddDealModal = ({
  onClose,
  onAddDeal,
  handleSelectedBedType,
}: AddDealModalProps) => {
  const bedTypeOptions = useRateStore((state) => state.bedTypeOptions);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const newDealData: NewDealData = {
      dealName: data.dealName,
      roomType: data.roomType,
      startDate: data.startDate,
      endDate: data.endDate,
      referenceNumber: "",
      statusDeal: "",
      reservationsLeft: 0,
    };
    setIsLoading(true);
    try {
      await onAddDeal(newDealData);
      toast({
        title: "Deal added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch {
      toast({
        title: "Failed to add deal.",
        description: "An error occurred while creating the deal.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" justifyContent="space-between">
        <FormControl mb={4} maxW="320px">
          <FormLabel>Deal Name</FormLabel>
          <Input
            {...register("dealName", validationRules.required)}
            placeHolder="Enter deal name"
            inputType="primary"
          />
          {errors.dealName && (
            <p style={{ color: "red", fontSize: "14px" }}>
              {errors.dealName.message}
            </p>
          )}
        </FormControl>

        <FormControl mb={4} maxW="320px">
          <FormLabel>Reference Number</FormLabel>
          <Input
            {...register("referenceNumber", validationRules.required)}
            placeHolder="Enter reference number"
            inputType="primary"
          />
          {errors.referenceNumber && (
            <p style={{ color: "red", fontSize: "14px" }}>
              {errors.referenceNumber.message}
            </p>
          )}
        </FormControl>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <FormControl mb={4} maxW="320px">
          <FormLabel>Start Date</FormLabel>
          <Input
            {...register("startDate", validationRules.required)}
            type="date"
            placeHolder={""}
            inputType="number"
          />
          {errors.startDate && (
            <p style={{ color: "red", fontSize: "14px" }}>
              {errors.startDate.message}
            </p>
          )}
        </FormControl>

        <FormControl mb={4} maxW="320px">
          <FormLabel>End Date</FormLabel>
          <Input
            {...register("endDate", validationRules.required)}
            type="date"
            placeHolder=""
            inputType="number"
          />
          {errors.endDate && (
            <p style={{ color: "red", fontSize: "14px" }}>
              {errors.endDate.message}
            </p>
          )}
        </FormControl>
      </Box>
      <FormControl mb={4} maxW="320px">
        <FormLabel>Room Type</FormLabel>
        <Select
          {...register("roomType", validationRules.required)}
          onChange={handleSelectedBedType}
          placeholder="Select room type"
        >
          {bedTypeOptions.map((option, index) => (
            <option key={`${option.value}-${index}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        {errors.roomType && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.roomType.message}
          </p>
        )}
      </FormControl>

      <ModalFooter>
        <Button text="Cancel" buttonType="warning" onClick={onClose} />
        <Button
          w="100px"
          text="Add Deal"
          buttonType="primary"
          isLoading={isLoading}
          type="submit"
        />
      </ModalFooter>
    </form>
  );
};

export default withModal(AddDealModal, "Add Deal");