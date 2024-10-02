import { ReactNode } from "react";

interface StackProps {
  children: ReactNode;
  spacing: number;
  direction: "row" | "column" | "row-reverse" | "column-reverse";
  wrap: "wrap" | "nowrap";
}

export default function Stack({
  children,
  spacing = 2,
  direction = "row",
  wrap = "nowrap",
}: StackProps) {
  const style = {
    display: "flex",
    gap: `${spacing * 0.25}rem`,
    flexWrap: wrap,
    flexDirection: direction,
  };
  return <div style={style}>{children}</div>;
}
