import "./index.css";
import Button from "../button";

export default function Label() {
  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <div className="wrap-label-title">
      <div className="wrap-label-title-text">
        <p className="label-title label-title-one">All room(100)</p>
        <p className="label-title label-title-second">Available room(20)</p>
        <p className="label-title label-title-third">Booked(80)</p>
      </div>
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
        />
      </div>
    </div>
  );
}
