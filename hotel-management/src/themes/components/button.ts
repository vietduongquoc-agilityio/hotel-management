import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: "md",
    fontWeight: "bold",
  },
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4,
      py: 2,
    },
    md: {
      fontSize: "md",
      px: 6,
      py: 3,
    },
    lg: {
      fontSize: "lg",
      px: 8,
      py: 4,
    },
  },
  variants: {
    solid: {
      bg: "blue.500",
      color: "white",
      _hover: {
        bg: "blue.600",
      },
    },
    outline: {
      border: "2px solid",
      borderColor: "blue.500",
      color: "blue.500",
      _hover: {
        bg: "blue.100",
      },
    },
    solids: {
      bg: "blue.100",
      color: "blue.800",
      hover: {
        bg: "blue.100",
        border: "1px solid #1570ef",
        color: "blue.900",
      },
    },
  },
  defaultProps: {
    size: "md",
    variant: "solid",
  },
});
