import { MouseEventHandler } from "react";

export interface ButtonProps {
  label: string;
  backgroundColor: string;
  size: "md" | "lg" | "sm";
  handleClick: MouseEventHandler<HTMLButtonElement>;
  borderRadius: number;
  color: string
}

export default function Button({
  label,
  backgroundColor = "red",
  size = "sm",
  handleClick,
  borderRadius,
  color,
}: ButtonProps) {
  let width = 20;
  if (size === "sm") width = 15;
  if (size === "lg") width = 25;
  const style = {
    backgroundColor,
    padding: `${width * 0.5}px ${width * 1}px`,
    border: "none",
    borderRadius,
    color
  };
  return (
    <button onClick={handleClick} style={style}>
      {label}
    </button>
  );
}
