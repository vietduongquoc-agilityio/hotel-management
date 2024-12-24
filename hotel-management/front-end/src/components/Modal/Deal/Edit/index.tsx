import { useForm } from "react-hook-form";
import { useState } from "react";
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
import {
  validationRules,
  EDIT_DEAL_MESSAGE,
  dealStatusOptions,
} from "@/constants";

// InterFace
import { DealData } from "@/interfaces";

// Stores
import { useRateStore } from "@/stores";

interface EditDealModalProps {
  onEditDeal: (updatedDealData: DealData) => void;
  onClose?: () => void;
  initialDealData: DealData;
}

const EditDealModal = ({
  onClose,
  onEditDeal,
  initialDealData,
}: EditDealModalProps) => {
  const bedTypeOptions = useRateStore((state) => state.bedTypeOptions);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialDealData,
  });

  const onSubmit = async (data: DealData) => {
    setIsLoading(true);
    try {
      await onEditDeal(data);
    } catch {
      toast({
        title: EDIT_DEAL_MESSAGE.ERROR,
        description: EDIT_DEAL_MESSAGE.ERROR_DESCRIPTION,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" justifyContent="space-between">
        <FormControl mb={4} maxW="320px" isInvalid={!!errors.dealName}>
          <FormLabel>Deal Name</FormLabel>
          <Input
            defaultValue={initialDealData.dealName}
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

        <FormControl mb={4} maxW="320px" isInvalid={!!errors.referenceNumber}>
          <FormLabel>Reference Number</FormLabel>
          <Input
            defaultValue={initialDealData.referenceNumber}
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
        <FormControl mb={4} maxW="320px" isInvalid={!!errors.startDate}>
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

        <FormControl mb={4} maxW="320px" isInvalid={!!errors.endDate}>
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
      <FormControl mb={4} maxW="320px" isInvalid={!!errors.roomType}>
        <FormLabel>Room Type</FormLabel>
        <Select
          defaultValue={initialDealData.roomType}
          {...register("roomType", validationRules.required)}
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

      <FormControl mb={4} maxW="320px" isInvalid={!!errors.statusDeal}>
        <FormLabel>Status Deal</FormLabel>
        <Select
          defaultValue={initialDealData.statusDeal}
          {...register("statusDeal")}
        >
          {dealStatusOptions.map((option, index) => (
            <option key={`${option.value}-${index}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        {errors.statusDeal && (
          <p style={{ color: "red" }}>{errors.statusDeal.message}</p>
        )}
      </FormControl>

      <ModalFooter>
        <Button text="Cancel" buttonType="warning" onClick={onClose} />
        <Button
          w="100px"
          text="Edit"
          buttonType="primary"
          isLoading={isLoading}
          type="submit"
          onClick={onClose}
        />
      </ModalFooter>
    </form>
  );
};

export default withModal(EditDealModal, "Edit");
