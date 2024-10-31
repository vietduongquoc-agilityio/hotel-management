/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { FormControl, FormLabel, useToast } from "@chakra-ui/react";
import withModal from "../../modalHoc";
import Button from "../../../button";
import Input from "../../../input";
import RateData from "../../../interfaceTypes/rateTypes";
import { createRate } from "../../../../services/rateServices";
import Spinner from "../../../spinner";
import useFormValidation from "../../../validate";

interface AddRateModalProps {
  onClose: () => void;
  onAddRate: (rateData: RateData) => void;
}

const AddRateModal = ({ onClose, onAddRate }: AddRateModalProps) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const [formData, setFormData] = useState({
    roomType: "",
    cancellationPolicy: "",
    price: "",
    availability: "",
  });

  const { errors, validate } = useFormValidation(formData);

  const handleSubmit = async () => {
    const { isValid } = validate(formData, [
      "roomType",
      "cancellationPolicy",
      "price",
      "availability",
    ]);

    if (!isValid) return;

    const newRateData: RateData = {
      roomType: formData.roomType,
      cancellationPolicy: formData.cancellationPolicy,
      deals: "Family Deal",
      dealPrice: formData.price,
      rate: formData.price,
      availability: formData.availability,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validate({ ...formData, [name]: value }, [name]);
  };

  return (
    <>
      <FormControl mb={4}>
        <FormLabel>Rate Type</FormLabel>
        <Input
          name="roomType"
          value={formData.roomType}
          onChange={handleChange}
          placeHolder="Enter room type"
          inputType="first"
        />
        {errors.roomType && (
          <p style={{ color: "red", fontSize: "14px" }}> {errors.roomType}</p>
        )}
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Cancellation Policy</FormLabel>
        <Input
          name="cancellationPolicy"
          value={formData.cancellationPolicy}
          onChange={handleChange}
          placeHolder="Enter cancellation policy"
          inputType="first"
        />
        {errors.cancellationPolicy && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.cancellationPolicy}
          </p>
        )}
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Availability Room</FormLabel>
        <Input
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          placeHolder="Enter number of rooms"
          inputType="first"
        />
        {errors.availability && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {errors.availability}
          </p>
        )}
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Price</FormLabel>
        <Input
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeHolder="Enter room price"
          inputType="first"
        />
        {errors.price && (
          <p style={{ color: "red", fontSize: "14px" }}>{errors.price}</p>
        )}
      </FormControl>

      <Button onClick={onClose} text="Cancel" buttonType="cancelButton" />
      {loading ? (
        <Spinner />
      ) : (
        <Button onClick={handleSubmit} text="Add" buttonType="first" />
      )}
    </>
  );
};

export default withModal(AddRateModal, "Add rate");
