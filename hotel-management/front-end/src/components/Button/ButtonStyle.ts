import { ButtonProps } from "@chakra-ui/react";

export type ButtonType =
  | "first"
  | "paginationButton"
  | "cancelButton"
  | "deleteButton"
  | "nextButton";

export const getStyleButton = (type: ButtonType): ButtonProps => {
  switch (type) {
    case "first":
      return first;
    case "paginationButton":
      return paginationButton;
    case "cancelButton":
      return cancelButton;
    case "deleteButton":
      return deleteButton;
    default:
      return nextButton;
  }
};

const first: ButtonProps = {
  fontSize: "md",
  variant: "solid",
  fontWeight: "bold",
  cursor: "pointer",
};

const nextButton: ButtonProps = {
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

const paginationButton: ButtonProps = {
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

const cancelButton: ButtonProps = {
  fontSize: "md",
  variant: "solid",
  fontWeight: "bold",
  bg: "white.200",
  border: "1px solid #858d9d",
  color: "grey.500",
  _hover: {
    bg: "error.400",
    color: "white.200",
    border: "none",
  },
  marginRight: "20px",
  cursor: "pointer",
};

const deleteButton: ButtonProps = {
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
