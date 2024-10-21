import { MouseEventHandler, memo } from "react";

export interface ButtonProps {
  className?: string;
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
  disabled?: boolean;
  border?: string;
  padding?: number;
}

function Button({
  className = "",
  label,
  backgroundColor,
  handleClick,
  borderRadius,
  color = "white",
  width,
  height,
  fontSize,
  fontWeight,
  disabled,
  border,
  padding,
}: ButtonProps) {
  const style = {
    backgroundColor,

    border,
    borderRadius: `${borderRadius}px`,
    color,
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize,
    fontWeight,
    width: `${width}px`,
    height: `${height}px`,
    padding: `${padding}px`,
  };
  return (
    <button
      onClick={handleClick}
      style={style}
      className={className}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default memo(Button);
