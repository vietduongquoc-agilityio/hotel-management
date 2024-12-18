import { InputType } from ".";

export const getStyleInput = (type: InputType) => {
  switch (type) {
    case "primary": {
      return primary;
    }
    case "number": {
      return number;
    }
  }
};

const primary = {
  size: "md",
  variant: "outline",
};

const number = {
  size: "md",
  variant: "outline",
};
