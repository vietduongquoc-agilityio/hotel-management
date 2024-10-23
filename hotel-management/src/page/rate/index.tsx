import Title from "../../components/title";
import LabelRate from "../../components/label/labelRate";
import "./index.css";
import TableRate from "../../components/table/rate";

export default function RatePage() {
  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <article className="room-page-container">
      <Title titleText="Guests" className="title" />
      <LabelRate handleClick={handleClick} />
      <TableRate />
    </article>
  );
}
