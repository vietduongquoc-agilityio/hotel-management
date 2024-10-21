import "./index.css";
import Button from "../button";

export interface LabelProps {
  handleClick: () => void;
}

export default function Label({ handleClick }: LabelProps) {
  return (
    <div className="wrap-label-title">
      <ul className="wrap-label-title-text">
        <li className="label-title label-title-one">All room(100)</li>
        <li className="label-title label-title-second">Available room(20)</li>
        <li className="label-title label-title-third">Booked(80)</li>
      </ul>
      <div className="label-action">
        <Button
          className="btn-action-add"
          label="Add room"
          borderRadius={8}
          backgroundColor="#1570ef"
          handleClick={handleClick}
          size="lg"
          width={115}
          height={40}
          border="none"
        />
      </div>
    </div>
  );
}
