import { ButtonProps } from "@chakra-ui/react";

export type ButtonType =
  | "primary"
  | "pagination"
  | "secondary"
  | "error"
  | "disabled";

export const getStyleButton = (type: ButtonType): ButtonProps => {
  switch (type) {
    case "primary":
      return primary;
    case "pagination":
      return pagination;
    case "secondary":
      return secondary;
    case "error":
      return error;
    default:
      return disabled;
  }
};

const primary: ButtonProps = {
  fontSize: "md",
  variant: "solid",
  fontWeight: "bold",
  cursor: "pointer",
  bg: "blue.600",
  color: "white.200",
  _hover: {
    bg: "blue.800",
  },
};

const disabled: ButtonProps = {
  fontSize: "md",
  variant: "solid",
  fontWeight: "bold",
  color: "grey.500",
  _hover: {
    bg: "blue.100",
    border: "1px solid #1570ef",
    color: "blue.500",
  },
  width: "90px",
  height: "36px",
  bg: "white.200",
  borderRadius: "8px",
  border: "1px solid #667085",
  cursor: "pointer",
};

const pagination: ButtonProps = {
  border: "1px solid #ffffff",
  height: "40px",
  size: "sm",
  width: "40px",
  color: "grey.400",
  _hover: { color: "blue.500", bg: "blue.100" },
  _active: {
    color: "blue.500",
  },
  cursor: "pointer",
};

const secondary: ButtonProps = {
  fontSize: "md",
  variant: "solid",
  fontWeight: "bold",
  bg: "white.200",
  border: "1px solid #858d9d",
  color: "grey.500",
  _hover: {
    bg: "error.400",
    color: "white.200",
    border: "1px solid #FFFFFF",
  },
  marginRight: "20px",
  cursor: "pointer",
};

const error: ButtonProps = {
  fontSize: "md",
  variant: "solid",
  fontWeight: "bold",
  bg: "error.400",
  border: "none",
  color: "white.200",
  _hover: {
    bg: "red",
  },
  cursor: "pointer",
};
