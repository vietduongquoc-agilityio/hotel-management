import { MouseEventHandler, memo, useState } from "react";

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
  onClick?: () => void;
  toggle?: boolean;
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
  toggle = false,
}: ButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

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

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (toggle) {
      setIsOpen(!isOpen);
    }
    if (handleClick) {
      handleClick(event);
    }
  };

  return (
    <div className="button-wrapper">
      <button
        onClick={handleToggle}
        style={style}
        className={className}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
}

export default memo(Button);
