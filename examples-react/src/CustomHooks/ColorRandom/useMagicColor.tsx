import { useEffect, useState } from "react";

function useMagicColor() {
  const [color, setColor] = useState("green");
  useEffect(() => {
    const intervalColor = setInterval(() => {
      const newColor = Math.floor(Math.random() * 999999)
        .toString(16)
        .padStart(6, "0");
      setColor(`#${newColor}`);
    }, 1000);
    return () => {
      clearInterval(intervalColor);
    };
  }, []);
  return color;
}

export { useMagicColor };
