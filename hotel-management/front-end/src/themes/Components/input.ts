export const Input = {
  baseStyle: {
    field: {
      borderRadius: "md",
    },
  },
  sizes: {
    sm: {
      field: {
        fontSize: "sm",
        px: 2,
        py: 1,
      },
    },
    md: {
      field: {
        fontSize: "md",
        px: 4,
        py: 2,
      },
    },
    lg: {
      field: {
        fontSize: "lg",
        px: 6,
        py: 3,
      },
    },
  },
  variants: {
    outline: {
      field: {
        borderColor: "grey.500",
        _hover: {
          borderColor: "blue.400",
        },
        _focus: {
          borderColor: "blue.500",
        },
      },
    },
  },
  defaultProps: {
    size: "md",
    variant: "outline",
  },
};
