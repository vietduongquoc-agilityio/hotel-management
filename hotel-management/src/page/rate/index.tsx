import Title from "../../components/title";
import Label from "../../components/label";
import "./index.css";
import TableRate from "../../components/table/rate";

export default function RatePage() {
  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <article className="room-page-container">
      <Title titleText="Guests" className="title" />
      <Label handleClick={handleClick} />
      <TableRate />
    </article>
  );
}