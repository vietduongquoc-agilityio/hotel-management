import { Input as InputUI, InputProps } from "@chakra-ui/react";
import { getStyleInput } from "./inputStyle";

export type inputType = "first" | "second";

interface inputTypeProps extends InputProps {
  placeHolder: string;
  inputType: inputType;
}

const Input = (InputTypeProps: inputTypeProps) => {
  const { placeHolder, inputType, ...restProps } = InputTypeProps;
  const styleFirst = getStyleInput(inputType);

  const propsStyle = {
    ...styleFirst,
    placeholder: placeHolder,
    ...restProps,
  };

  return <InputUI {...propsStyle} />;
};

export default Input;
