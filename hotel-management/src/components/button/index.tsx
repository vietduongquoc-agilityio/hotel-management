import { MouseEventHandler, memo } from "react";

export interface ButtonProps {
  className: string;
  label: string;
  backgroundColor?: string;
  size?: "lg" | "md" | "sm";
  handleClick: MouseEventHandler<HTMLButtonElement>;
  borderRadius?: number;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  width?: number;
  height?: number;
}

function Button({
  className,
  label,
  backgroundColor,
  size,
  handleClick,
  borderRadius,
  color = "white",
  width,
  height,
}: ButtonProps) {
  let padding = "10px 24px";

  if (size === "sm") padding = "5px 15px";
  else if (size === "md") padding = "7px 20px";

  const style = {
    fontSize: "14px",
    className,
    backgroundColor,
    padding,
    border: "none",
    borderRadius: `${borderRadius}px`,
    color,
    cursor: "pointer",
    size: "lg",
    fontWeight: "500",
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <button onClick={handleClick} style={style}>
      {label}
    </button>
  );
}

export default memo(Button);
