import {
  FormControl,
  FormLabel,
  Select,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";

// Components
import { Input, withModal, Button } from "@/components";

// Constants
import { ADD_GUEST_MESSAGE, validationRules } from "@/constants";

// InterFace
import { NewGuestData } from "@/interfaces";

// Utils
import { generateCode } from "@/utils";

// Stores
import { useRateStore } from "@/stores";

interface AddGuestModalProps {
  onAddGuest: (guestData: NewGuestData) => void;
  onClose: () => void;
  handleSelectedBedType: (event: ChangeEvent<HTMLSelectElement>) => void;
  isDisabled: boolean;
}

interface FormData {
  guestName: string;
  roomType: string;
  stay: number;
  price: number;
  registrationNumber: string;
  totalAmount: number;
  checkInDate: Date;
}

const AddGuestModal = ({
  onClose,
  onAddGuest,
  handleSelectedBedType,
}: AddGuestModalProps) => {
  const defaultRegistrationNumber = generateCode();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const bedTypeOptions = useRateStore((state) => state.bedTypeOptions);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      registrationNumber: `#${defaultRegistrationNumber}`,
      stay: 0,
      price: 0,
      totalAmount: 0,
    },
  });

  const stay = watch("stay");
  const price = watch("price");

  useEffect(() => {
    const calculatedTotalAmount = stay * price;
    setValue("totalAmount", calculatedTotalAmount);
  }, [stay, price, setValue]);

  const onSubmit = async (data: FormData) => {
    const newGuestData: NewGuestData = {
      roomType: data.roomType,
      guestName: data.guestName,
      stay: data.stay,
      price: data.price,
      registrationNumber: data.registrationNumber,
      totalAmount: data.totalAmount,
      checkInDate: data.checkInDate,
    };
    setIsLoading(true);
    try {
      await onAddGuest(newGuestData);
      toast({
        title: ADD_GUEST_MESSAGE.SUCCESS,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch {
      toast({
        title: ADD_GUEST_MESSAGE.ERROR,
        description: ADD_GUEST_MESSAGE.ERROR_DESCRIPTION,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(true);
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl mb={4}>
        <FormLabel>Guest Name</FormLabel>
        <Input
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

      <FormControl mb={4}>
        <FormLabel>Registration Number</FormLabel>
        <Input
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

      <FormControl mb={4}>
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

      <FormControl mb={4}>
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

      <FormControl mb={4}>
        <FormLabel>Stay by nights</FormLabel>
        <Input
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

      <FormControl mb={4}>
        <FormLabel>Price</FormLabel>
        <Input
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

      <FormControl mb={4}>
        <FormLabel>Total Amount</FormLabel>
        <Input
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
          text="Add"
          buttonType="primary"
          isLoading={isLoading}
        />
      </ModalFooter>
    </form>
  );
};

export default withModal(AddGuestModal, "Add Guest");
