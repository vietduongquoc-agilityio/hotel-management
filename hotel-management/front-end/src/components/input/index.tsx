// import { Input as InputUI, InputProps } from "@chakra-ui/react";
// import { getStyleInput } from "./inputStyle";
// import { memo } from "react";

// export type inputType = "first" | "second";

// interface inputTypeProps extends InputProps {
//   placeHolder: string;
//   inputType: inputType;
// }

// const Input = (InputTypeProps: inputTypeProps) => {
//   const { placeHolder, inputType, ...restProps } = InputTypeProps;
//   const styleFirst = getStyleInput(inputType);

//   const propsStyle = {
//     ...styleFirst,
//     placeholder: placeHolder,
//     ...restProps,
//   };

//   return <InputUI {...propsStyle} />;
// };

// export default memo(Input);

import { forwardRef, memo } from "react";
import { Input as InputUI, InputProps } from "@chakra-ui/react";
import { getStyleInput } from "./inputStyle";

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
