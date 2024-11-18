import { InputType } from ".";

export const getStyleInput = (type: InputType) => {
  switch (type) {
    case "default": {
      return first;
    }
  }
};

const first = {
  size: "md",
  variant: "outline",
};
