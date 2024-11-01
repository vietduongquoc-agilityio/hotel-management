import { InputType } from ".";

export const getStyleInput = (type: InputType) => {
  switch (type) {
    case "first": {
      return first;
    }
    case "second": {
      return second;
    }
  }
};

const first = {
  size: "md",
  variant: "outline",
};

const second = {
  size: "lg",
  variant: "outline",
};
