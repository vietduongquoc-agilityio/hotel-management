import { ChangeEventHandler } from "react";

export interface InputProps {
  border: string;
  className: string;
  label: string;
  placeholder?: string;
  type: string;
  value: string | number;
  backgroundColor?: string;
  size?: "md" | "lg" | "sm";
  borderRadius?: number;
  color?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
}

export default function Input({
  className,
  label,
  placeholder = "Text",
  type,
  value,
  backgroundColor = "#fff",
  size = "lg",
  borderRadius = 4,
  color = "#000",
  onChange,
  direction = "column",
}: InputProps) {
  let padding = "10px";
  if (size === "sm") padding = "5px";
  if (size === "lg") padding = "15px";

  const style = {
    className: "",
    display: "flex",
    flexDirection: direction,
    backgroundColor,
    padding,
    borderRadius: `${borderRadius}px`,
    color,
    border: "none",
  };

  return (
    <div>
      <label>{label}</label>
      <input
        className={className}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={style}
      />
    </div>
  );
}
