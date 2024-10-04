import { MouseEventHandler } from "react";

export interface ButtonProps {
  label: string;
  backgroundColor?: string;
  size?: "md" | "lg" | "sm";
  handleClick: MouseEventHandler<HTMLButtonElement>;
  borderRadius?: number;
  color?: string;
}

export default function Button({
  label,
  backgroundColor = "red",
  size = "sm",
  handleClick,
  borderRadius = 4,
  color = "white",
}: ButtonProps) {
  let padding = "5px 10px";

  if (size === "lg") padding = "10px 20px";
  else if (size === "md") padding = "7px 15px";

  const style = {
    backgroundColor,
    padding,
    border: "none",
    borderRadius: `${borderRadius}px`,
    color,
    cursor: "pointer",
  };

  return (
    <button onClick={handleClick} style={style}>
      {label}
    </button>
  );
}
