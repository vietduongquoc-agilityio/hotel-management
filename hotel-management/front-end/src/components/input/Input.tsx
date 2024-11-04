import { forwardRef, memo } from "react";
import { Input as InputUI, InputProps } from "@chakra-ui/react";
import { getStyleInput } from "./InputStyle";

export type InputType = "first" | "second";

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
      ...restProps,
    };

    return <InputUI ref={ref} {...propsStyle} />;
  }
);

Input.displayName = "Input";

export default memo(Input);
