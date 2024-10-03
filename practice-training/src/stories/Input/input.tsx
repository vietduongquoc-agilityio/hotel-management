import { ChangeEventHandler } from "react";

export interface InputProps {
  label: string;
  placeholder: string;
  type: string;
  value: string | number;
  backgroundColor: string;
  size: "md" | "lg" | "sm";
  borderRadius: number;
  color: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  direction: "row" | "column" | "row-reverse" | "column-reverse";
}

export default function Input({
  label,
  placeholder = "Text",
  type,
  value,
  backgroundColor,
  size = "lg",
  borderRadius,
  color,
  onChange,
  direction = "column",
}: InputProps) {
  let padding = "10px";
  if (size === "sm") padding = "5px";
  if (size === "lg") padding = "15px";
  const style = {
    display: "flex",
    flexDirection: direction,
    backgroundColor,
    padding,
    borderRadius: `${borderRadius}px`,
    color,
    border: "1px solid #ccc",
  };
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={style}
      />
    </div>
  );
}
