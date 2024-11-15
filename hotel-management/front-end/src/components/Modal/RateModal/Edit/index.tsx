import { useState } from "react";
import {
  ModalFooter,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

// Constants
import { RateData } from "@/interfaces/Rate";

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
    } catch (error) {
      toast({
        title: "Failed to update rate.",
        description: "An error occurred while updating the rate.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error updating rate:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl mb={4} isInvalid={!!errors.roomType}>
        <FormLabel>Rate Type</FormLabel>
        <Input
          {...register("roomType", { required: "Room type is required" })}
          placeHolder="Enter room type"
          inputType="first"
        />
        {errors.roomType?.message && (
          <p style={{ color: "red" }}>{String(errors.roomType.message)}</p>
        )}
      </FormControl>

      <FormControl mb={4} isInvalid={!!errors.cancellationPolicy}>
        <FormLabel>Cancellation Policy</FormLabel>
        <Input
          {...register("cancellationPolicy", {
            required: "Cancellation policy is required",
          })}
          placeHolder="Enter cancellation policy"
          inputType="first"
        />
        {errors.cancellationPolicy?.message && (
          <p style={{ color: "red" }}>{String(errors.cancellationPolicy.message)}</p>
        )}
      </FormControl>

      <FormControl mb={4} isInvalid={!!errors.totalOfRooms}>
        <FormLabel>Rooms</FormLabel>
        <Input
          {...register("totalOfRooms", {
            required: "totalOfRooms is required",
          })}
          placeHolder="Enter total rooms"
          inputType="first"
        />
        {errors.totalOfRooms?.message && (
          <p style={{ color: "red" }}>{String(errors.totalOfRooms.message)}</p>
        )}
      </FormControl>

      <FormControl mb={4} isInvalid={!!errors.dealPrice}>
        <FormLabel>Deal Price</FormLabel>
        <Input
          {...register("dealPrice", { required: "Deal price is required" })}
          placeHolder="Enter deal price"
          inputType="first"
        />
        {errors.dealPrice?.message && (
          <p style={{ color: "red" }}>{String(errors.dealPrice.message)}</p>
        )}
      </FormControl>

      <ModalFooter>
        <Button onClick={onClose} text="Cancel" buttonType="cancelButton" />
        {loading ? (
          <Spinner />
        ) : (
          <Button type="submit" text="Edit" buttonType="first" />
        )}
      </ModalFooter>
    </form>
  );
};

export default withModal(EditRateModal, "Edit");
