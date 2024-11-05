// src/constants/validationSchema.ts
export const VALIDATION_MESSAGES = {
  required: "This field is required",
  numeric: "This field must be a number",
  invalidEmail: "Please enter a valid email",
};

export const validationRules = {
  required: {
    required: VALIDATION_MESSAGES.required,
  },
  numeric: {
    pattern: {
      value: /^[0-9]*$/,
      message: VALIDATION_MESSAGES.numeric,
    },
  },
  email: {
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: VALIDATION_MESSAGES.invalidEmail,
    },
  },
};
