import { Button as ButtonUI, ButtonProps } from "@chakra-ui/react";
import { getStyleButton } from "./buttonStyle";
import { memo } from "react";

export type buttonType =
  | "first"
  | "nextButton"
  | "paginationButton"
  | "cancelButton"
  | "deleteButton";

interface buttonTypeProps extends ButtonProps {
  text: string;
  buttonType: buttonType;
}

const Button = (ButtonTypeProps: buttonTypeProps) => {
  const { text, buttonType } = ButtonTypeProps;
  const styleFirst = getStyleButton(buttonType);

  const propsStyle = {
    ...styleFirst,
    ...ButtonTypeProps,
  };

  return <ButtonUI {...propsStyle}>{text}</ButtonUI>;
};

export default memo(Button);
