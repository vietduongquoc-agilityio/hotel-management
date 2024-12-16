import {
  FormControl,
  FormLabel,
  Select,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";

// Components
import { Input, withModal, Button } from "@/components";

// Constants
import { validationRules, EDIT_GUEST_MESSAGE } from "@/constants";

// InterFace
import { GuestData } from "@/interfaces";

// Stores
import { useRateStore } from "@/stores";

interface EditGuestModalProps {
  onClose?: () => void;
  onEditGuest: (updatedGuestData: GuestData) => void;
  initialGuestData: GuestData;
}

const EditGuestModal = ({
  onClose,
  onEditGuest,
  initialGuestData,
}: EditGuestModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const bedTypeOptions = useRateStore((state) => state.bedTypeOptions);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialGuestData,
  });

  const onSubmit = async (data: GuestData) => {
    setIsLoading(true);
    try {
      await onEditGuest(data);
      toast({
        title: EDIT_GUEST_MESSAGE.SUCCESS,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      if (onClose) onClose();
    } catch {
      toast({
        title: EDIT_GUEST_MESSAGE.ERROR,
        description: EDIT_GUEST_MESSAGE.ERROR_DESCRIPTION,
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
      <FormControl mb={4} isInvalid={!!errors.guestName}>
        <FormLabel>Guest Name</FormLabel>
        <Input
          defaultValue={initialGuestData.guestName}
          {...register("guestName", validationRules.required)}
          placeHolder="Enter name"
          inputType="primary"
        />
        {errors.guestName && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.guestName.message}
          </p>
        )}
      </FormControl>

      <FormControl mb={4} isInvalid={!!errors.registrationNumber}>
        <FormLabel>Registration Number</FormLabel>
        <Input
          defaultValue={initialGuestData.registrationNumber}
          {...register("registrationNumber", validationRules.required)}
          placeHolder=""
          inputType="primary"
        />
        {errors.registrationNumber && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.registrationNumber.message}
          </p>
        )}
      </FormControl>

      <FormControl mb={4} isInvalid={!!errors.checkInDate}>
        <FormLabel>Check-in Date</FormLabel>
        <Input
          {...register("checkInDate", validationRules.required)}
          type="date"
          placeHolder=""
          inputType="number"
        />
        {errors.checkInDate && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.checkInDate.message}
          </p>
        )}
      </FormControl>

      <FormControl mb={4} isInvalid={!!errors.roomType}>
        <FormLabel>Room Type</FormLabel>
        <Select
          defaultValue={initialGuestData.roomType}
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

      <FormControl mb={4} isInvalid={!!errors.stay}>
        <FormLabel>Stay by nights</FormLabel>
        <Input
          defaultValue={initialGuestData.stay}
          {...register("stay", {
            ...validationRules.required,
            ...validationRules.numeric,
          })}
          placeHolder="Enter number stay"
          inputType="number"
        ></Input>
        {errors.stay && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.stay.message}
          </p>
        )}
      </FormControl>

      <FormControl mb={4} isInvalid={!!errors.price}>
        <FormLabel>Price</FormLabel>
        <Input
          defaultValue={initialGuestData.price}
          {...register("price", {
            ...validationRules.required,
            ...validationRules.numeric,
          })}
          placeHolder="Enter room price"
          inputType="number"
        ></Input>
        {errors.price && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.price.message}
          </p>
        )}
      </FormControl>

      <FormControl mb={4} isInvalid={!!errors.totalAmount}>
        <FormLabel>Total Amount</FormLabel>
        <Input
          defaultValue={initialGuestData.totalAmount}
          {...register("totalAmount", {
            ...validationRules.required,
            ...validationRules.numeric,
          })}
          isDisabled
          placeHolder="Enter total amount"
          inputType="number"
        ></Input>
        {errors.totalAmount && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.totalAmount.message}
          </p>
        )}
      </FormControl>

      <ModalFooter>
        <Button text="Cancel" buttonType="warning" onClick={onClose} />
        <Button
          w="100px"
          type="submit"
          text="Edit"
          buttonType="primary"
          isLoading={isLoading}
        />
      </ModalFooter>
    </form>
  );
};

export default withModal(EditGuestModal, "Edit");
