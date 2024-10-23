import "./index.css";
import Button from "../button";

export interface LabelProps {
  handleClick: () => void;
}

export default function LabelRate({ handleClick }: LabelProps) {
  return (
    <div className="wrap-label-title wrap-label-btn">
      <Button
        className="btn-action-add"
        label="Add rate"
        borderRadius={8}
        backgroundColor="#1570ef"
        handleClick={handleClick}
        width={115}
        height={40}
        border="none"
      />
    </div>
  );
}
