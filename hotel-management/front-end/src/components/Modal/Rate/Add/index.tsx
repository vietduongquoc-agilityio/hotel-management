import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";

// InterFace
import { NewRateData } from "@/interfaces";

// Constants
import { ADD_RATE_MESSAGE, validationRules } from "@/constants";

// Components
import { Button, Input, withModal } from "@/components";

interface AddRateModalProps {
  onAddRate: (rateData: NewRateData) => void;
  onClose: () => void;
}

interface FormData {
  roomType: string;
  cancellationPolicy: string;
  price: string;
  totalOfBooked: number;
  totalOfRooms: number;
}

const AddRateModal = ({ onAddRate, onClose }: AddRateModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
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
      rate: data.price,
      totalOfBooked: 0,
      totalOfRooms: data.totalOfRooms,
      availability: "",
    };

    setIsLoading(true);
    try {
      await onAddRate(newRateData);
      toast({
        title: ADD_RATE_MESSAGE.SUCCESS,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch {
      toast({
        title: ADD_RATE_MESSAGE.ERROR,
        description: ADD_RATE_MESSAGE.ERROR_DESCRIPTION,
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
      <FormControl mb={4}>
        <FormLabel>Rate Type</FormLabel>
        <Input
          {...register("roomType", validationRules.required)}
          placeHolder="Enter room type"
          inputType="primary"
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
          inputType="primary"
        />
        {errors.cancellationPolicy && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.cancellationPolicy.message}
          </p>
        )}
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Rooms</FormLabel>
        <Input
          {...register("totalOfRooms", {
            ...validationRules.required,
            ...validationRules.numeric,
          })}
          placeHolder="Enter number of rooms"
          inputType="primary"
        />
        {errors.totalOfRooms && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.totalOfRooms.message}
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
          inputType="primary"
        />
        {errors.price && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.price.message}
          </p>
        )}
      </FormControl>
      <ModalFooter>
        <Button text="Cancel" buttonType="warning" onClick={onClose} />
        <Button
          isLoading={isLoading}
          type="submit"
          text="Add"
          buttonType="primary"
        />
      </ModalFooter>
    </form>
  );
};

export default withModal(AddRateModal, "Add rate");
