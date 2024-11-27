import { Button as ButtonUI, ButtonProps } from "@chakra-ui/react";
import { getStyleButton } from "./button-style";
import { memo } from "react";

export type buttonType =
  | "primary"
  | "secondary"
  | "surface"
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

  return (
    <ButtonUI {...propsStyle}>
      {text}
    </ButtonUI>
  );
};

export default memo(Button);
