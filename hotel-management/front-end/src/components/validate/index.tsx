/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

const useFormValidation = (initialValues: Record<string, any>) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (
    values: Record<string, any>,
    requiredFields: string[]
  ): ValidationResult => {
    const newErrors: Record<string, string> = {};

    requiredFields.forEach((field) => {
      if (!values[field]) {
        newErrors[field] = `${field} is required`;
      }
    });

    setErrors(newErrors);

    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors,
    };
  };

  return { errors, validate };
};

export default useFormValidation;
