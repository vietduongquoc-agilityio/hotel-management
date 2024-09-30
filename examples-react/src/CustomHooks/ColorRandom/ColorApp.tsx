import { useMagicColor } from "./useMagicColor";

function BigCircle() {
  const color = useMagicColor();
  return (
    <div className="big-circle" style={{ backgroundColor: color }}>
      <div>Big Circle</div>
    </div>
  );
}

export default BigCircle;
