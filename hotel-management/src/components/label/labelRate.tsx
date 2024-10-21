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
      <Button
        className="btn-action-filter"
        label="Filter"
        borderRadius={8}
        backgroundColor="#ffffff"
        handleClick={handleClick}
        width={95}
        height={40}
        border="1px solid #667085"
        color="#667085"
      />
    </div>
  );
}
