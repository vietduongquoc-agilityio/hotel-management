import { Button as ButtonUI, ButtonProps } from "@chakra-ui/react";
import { getStyleButton } from "./ButtonStyle";
import { memo } from "react";

export type buttonType =
  | "primary"
  | "secondary"
  | "pagination"
  | "warning"
  | "error";

interface buttonTypeProps extends ButtonProps {
  text: string;
  buttonType: buttonType;
}

const Button = (ButtonTypeProps: buttonTypeProps) => {
  const { text, buttonType, ...styleProps } = ButtonTypeProps;
  const styleFirst = getStyleButton(buttonType);

  const propsStyle = {
    ...styleFirst,
    ...styleProps,
  };

  return <ButtonUI {...propsStyle}>{text}</ButtonUI>;
};

export default memo(Button);
