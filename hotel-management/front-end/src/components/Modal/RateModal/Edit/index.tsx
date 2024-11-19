import { useState } from "react";
import {
  ModalFooter,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

// InterFace
import { RateData } from "@/interfaces/Rate";

// Constants
import { validationRules } from "@/constant/Validate";

// Components
import withModal from "@/components/Modal/modalHoc";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Spinner from "@/components/Spinner";

interface EditRateModalProps {
  onClose: () => void;
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
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const onSubmit = async (data: RateData) => {
    setLoading(true);
    try {
      await onEditRate(data);
      if (onClose) onClose();
    } catch {
      toast({
        title: "Failed to update rate.",
        description: "An error occurred while updating the rate.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
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
        <Button onClick={onClose} text="Cancel" buttonType="secondary" />
        {loading ? (
          <Spinner />
        ) : (
          <Button type="submit" text="Edit" buttonType="primary" />
        )}
      </ModalFooter>
    </form>
  );
};

export default withModal(EditRateModal, "Edit");
