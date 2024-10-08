import { ReactNode } from "react";
import React from "react";

export interface DescriptionProps {
  children: ReactNode;
  spacing?: number;
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  color?: string;
  fontsize?: "md" | "lg" | "sm";
}

export default function Description({
  fontsize = "sm",
  children,
  spacing = 1,
  direction = "row",
  color = "grey",
}: DescriptionProps) {
  let scale = "20px";
  if (fontsize === "sm") scale = "15px";
  if (fontsize === "lg") scale = "25px";
  const style = {
    display: "flex",
    gap: `${spacing * 0.25}rem`,
    flexDirection: direction,
    color,
    fontSize: scale,
  };
  return (
    <div style={style}>
      <p>{children}</p>
    </div>
  );
}
