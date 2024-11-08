/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";

// InterFace
import { NewRateData } from "@/Interface/Rate";

// Constants
import { validationRules } from "@/constant/Validate";

// Components
import withModal from "@/components/Modal/modalHoc";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Spinner from "@/components/Spinner";

interface AddRateModalProps {
  onClose: () => void;
  onAddRate: (rateData: NewRateData) => void;
}

interface FormData {
  roomType: string;
  cancellationPolicy: string;
  price: string;
  availability: string;
  totalOfBooked: number;
}

const AddRateModal = ({ onClose, onAddRate }: AddRateModalProps) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const newRateData: NewRateData = {
      roomType: data.roomType,
      cancellationPolicy: data.cancellationPolicy,
      deals: "Family Deal",
      dealPrice: data.price,
      availability: data.availability,
      rate: data.price,
      totalOfBooked: 0,
    };

    setLoading(true);
    try {
      await onAddRate(newRateData);
      toast({
        title: "Rate added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Failed to add rate.",
        description: "An error occurred while creating the rate.",
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
      <FormControl mb={4}>
        <FormLabel>Rate Type</FormLabel>
        <Input
          {...register("roomType", validationRules.required)}
          placeHolder="Enter room type"
          inputType="first"
        />
        {errors.roomType && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.roomType.message}
          </p>
        )}
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Cancellation Policy</FormLabel>
        <Input
          {...register("cancellationPolicy", validationRules.required)}
          placeHolder="Enter cancellation policy"
          inputType="first"
        />
        {errors.cancellationPolicy && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.cancellationPolicy.message}
          </p>
        )}
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Availability Room</FormLabel>
        <Input
          {...register("availability", {
            ...validationRules.required,
            ...validationRules.numeric,
          })}
          placeHolder="Enter number of rooms"
          inputType="first"
        />
        {errors.availability && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.availability.message}
          </p>
        )}
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Price</FormLabel>
        <Input
          {...register("price", {
            ...validationRules.required,
            ...validationRules.numeric,
          })}
          placeHolder="Enter room price"
          inputType="first"
        />
        {errors.price && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.price.message}
          </p>
        )}
      </FormControl>
      <ModalFooter>
        <Button onClick={onClose} text="Cancel" buttonType="cancelButton" />
        {loading ? (
          <Spinner />
        ) : (
          <Button type="submit" text="Add" buttonType="first" />
        )}
      </ModalFooter>
    </form>
  );
};

export default withModal(AddRateModal, "Add rate");
