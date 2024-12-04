import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Select,
  ModalFooter,
} from "@chakra-ui/react";

// Components
import { Input, withModal, Button } from "@/components";

const AddGuestModal = () => {
  const [stayDuration, setStayDuration] = useState<number>(0);
  const [pricePerNight, setPricePerNight] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const handleCalculateTotal = (duration: number, price: number) => {
    const total = duration * price;
    setTotalAmount(total);
  };

  const handleStayDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;
    setStayDuration(value);
    handleCalculateTotal(value, pricePerNight);
  };

  const handlePricePerNightChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value) || 0;
    setPricePerNight(value);
    handleCalculateTotal(stayDuration, value);
  };

  return (
    <form>
      <FormControl mb={4}>
        <FormLabel>Guest Name</FormLabel>
        <Input placeHolder="Enter name" inputType="primary" />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Registration Number</FormLabel>
        <Input placeHolder="" inputType="primary" />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Check-in Date</FormLabel>
        <Input type="date" placeHolder="" inputType="number" />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Room Type</FormLabel>
        <Select placeholder="Select room type"></Select>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Stay by nights</FormLabel>
        <Input
          placeHolder=""
          inputType="number"
          onChange={handleStayDurationChange}
        ></Input>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Price</FormLabel>
        <Input
          placeHolder=""
          inputType="number"
          onChange={handlePricePerNightChange}
        ></Input>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Total Amount</FormLabel>
        <Input placeHolder="" inputType="number" value={totalAmount}></Input>
      </FormControl>

      <ModalFooter>
        <Button text="Cancel" buttonType="warning" />
        <Button w="100px" type="submit" text="Add" buttonType="primary"/>
      </ModalFooter>
    </form>
  );
};

export default withModal(AddGuestModal, "Add Guest");
