import Title from "../../components/title";
import Label from "../../components/label";
import TableRoom from "../../components/table";
import Pagination from "../../components/pagination/pagination";
import "./index.css";

export default function RoomPage() {
  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <article className="room-page-container">
      <Title titleText="Room" className="title" />
      <Label handleClick={handleClick} />
      <TableRoom />
      <Pagination />
    </article>
  );
}
