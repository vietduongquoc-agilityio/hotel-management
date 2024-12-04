export type ButtonType =
  | "primary"
  | "surface"
  | "warning"
  | "error"
  | "secondary";

export const getStyleButton = (type: ButtonType) => {
  switch (type) {
    case "primary":
      return primary;
    case "surface":
      return surface;
    case "warning":
      return warning;
    case "error":
      return error;
    default:
      return secondary;
  }
};

const primary = {
  fontSize: "md",
  variant: "solid",
  fontWeight: "bold",
  cursor: "pointer",
  bg: "blue.600",
  color: "white.200",
  borderRadius: "8px",
  _hover: {
    bg: "blue.800",
  },
};

const secondary = {
  fontSize: "md",
  variant: "solid",
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

const surface = {
  border: "1px solid #ffffff",
  height: "40px",
  size: "sm",
  width: "auto",
  color: "grey.400",
  _hover: { color: "blue.500", bg: "blue.100" },
  _active: {
    color: "blue.500",
  },
  cursor: "pointer",
};

const warning = {
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

const error = {
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
