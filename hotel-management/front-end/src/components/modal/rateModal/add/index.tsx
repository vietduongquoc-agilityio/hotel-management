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

// Constants
import { validationRules } from "@/constants/validate";
import { RateData } from "@/constants/interfaceTypes/rateTypes";

// Components
import withModal from "@/components/modal/modalHoc";
import Button from "@/components/button";
import Input from "@/components/input";
import Spinner from "@/components/spinner";

// Services
import { createRate } from "@/services/rateServices";

interface AddRateModalProps {
  onClose: () => void;
  onAddRate: (rateData: RateData) => void;
}

interface FormData {
  roomType: string;
  cancellationPolicy: string;
  price: string;
  availability: string;
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
    const newRateData: RateData = {
      roomType: data.roomType,
      cancellationPolicy: data.cancellationPolicy,
      deals: "Family Deal",
      dealPrice: data.price,
      rate: data.price,
      availability: data.availability,
      documentId: "",
    };

    setLoading(true);
    try {
      const createdRate = await createRate(newRateData);
      onAddRate(createdRate);
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
