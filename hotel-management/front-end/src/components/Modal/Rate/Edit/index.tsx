import { useState } from "react";
import {
  ModalFooter,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

// InterFace
import { RateData } from "@/interfaces";

// Constants
import { EDIT_RATE_MESSAGE, validationRules } from "@/constants";

// Components
import { Button, Input, withModal } from "@/components";

interface EditRateModalProps {
  onClose?: () => void;
  onEditRate: (updatedRateData: RateData) => void;
  initialRateData: RateData;
}

const EditRateModal = ({
  onClose,
  onEditRate,
  initialRateData,
}: EditRateModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialRateData,
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const onSubmit = async (data: RateData) => {
    setIsLoading(true);
    try {
      await onEditRate(data);
      if (onClose) onClose();
    } catch {
      toast({
        title: EDIT_RATE_MESSAGE.ERROR,
        description: EDIT_RATE_MESSAGE.ERROR_DESCRIPTION,
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
      <FormControl mb={4} isInvalid={!!errors.roomType}>
        <FormLabel>Rate Type</FormLabel>
        <Input
          {...register("roomType", validationRules.required)}
          placeHolder="Enter room type"
          inputType="primary"
        />
        {errors.roomType?.message && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.roomType.message}
          </p>
        )}
      </FormControl>

      <FormControl mb={4} isInvalid={!!errors.cancellationPolicy}>
        <FormLabel>Cancellation Policy</FormLabel>
        <Input
          {...register("cancellationPolicy", validationRules.required)}
          placeHolder="Enter cancellation policy"
          inputType="primary"
        />
        {errors.cancellationPolicy?.message && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.cancellationPolicy.message}
          </p>
        )}
      </FormControl>

      <FormControl mb={4} isInvalid={!!errors.totalOfRooms}>
        <FormLabel>Rooms</FormLabel>
        <Input
          {...register("totalOfRooms", {
            ...validationRules.required,
            ...validationRules.numeric,
          })}
          placeHolder="Enter total rooms"
          inputType="primary"
        />
        {errors.totalOfRooms?.message && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.totalOfRooms.message}
          </p>
        )}
      </FormControl>

      <FormControl mb={4} isInvalid={!!errors.dealPrice}>
        <FormLabel>Deal Price</FormLabel>
        <Input
          {...register("dealPrice", {
            ...validationRules.required,
            ...validationRules.numeric,
          })}
          placeHolder="Enter deal price"
          inputType="primary"
        />
        {errors.dealPrice?.message && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.dealPrice.message}
          </p>
        )}
      </FormControl>

      <ModalFooter>
        <Button onClick={onClose} text="Cancel" buttonType="warning" />
        <Button
          isLoading={isLoading}
          type="submit"
          text="Edit"
          buttonType="primary"
        />
      </ModalFooter>
    </form>
  );
};

export default withModal(EditRateModal, "Edit");
