import { ReactNode } from "react";

export interface TitleProps {
  children: ReactNode;
  spacing?: number; 
  direction?: "row" | "column" | "row-reverse" | "column-reverse"; 
  color?: string; 
}

export default function Title({
  children,
  spacing = 1,
  direction = "row",
  color = "rgb(84, 82, 82)",
}: TitleProps) {
  const style = {
    display: "flex",
    gap: `${spacing * 0.25}rem`,
    flexDirection: direction,
    color,
  };

  return (
    <div style={style}>
      <h1>{children}</h1>
    </div>
  );
}
