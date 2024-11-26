import { Input as InputUI, InputProps } from "@chakra-ui/react";
import { forwardRef, memo } from "react";
import { getStyleInput } from "./input-style";

export type InputType = "primary" | "number";

interface InputTypeProps extends InputProps {
  placeHolder: string;
  inputType: InputType;
}

const Input = forwardRef<HTMLInputElement, InputTypeProps>(
  ({ placeHolder, inputType, ...restProps }, ref) => {
    const styleFirst = getStyleInput(inputType);

    const propsStyle = {
      ...styleFirst,
      placeholder: placeHolder,
      ...(inputType === "number" && { type: "number" }),
      ...restProps,
    };

    return <InputUI ref={ref} {...propsStyle} />;
  }
);

Input.displayName = "Input";

export default memo(Input);
