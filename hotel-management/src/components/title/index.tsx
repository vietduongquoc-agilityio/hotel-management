export interface TitleProps {
  titleText: string;
  spacing?: number;
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  color?: string;
  size?: "md" | "lg" | "sm";
  weight?: number;
  className?: string;
}

export default function Title({
  titleText,
  spacing = 1,
  direction = "row",
  color = "#667085",
  size = "sm",
}: TitleProps) {
  let fontSize = "12px";
  if (size === "md") fontSize = "16px";
  if (size === "lg") fontSize = "20px";
  const style = {
    className: "",
    display: "flex",
    gap: `${spacing * 0.25}rem`,
    flexDirection: direction,
    color,
    fontSize,
  };

  return (
    <div>
      <h1 style={style}>{titleText}</h1>
    </div>
  );
}
