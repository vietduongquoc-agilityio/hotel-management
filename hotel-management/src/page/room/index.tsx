import { useState } from "react";
import Title from "../../components/title";
import Label from "../../components/label/labelRoom";
import TableRoom from "../../components/table/room";
import Pagination from "../../components/pagination/pagination";
import AddRoomModal from "../../components/modal/rateModal/add";
import "./index.css";

export default function RoomPage() {
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [rooms, setRooms] = useState<any[]>([]);

  const handleAddRoomClick = () => {
    setIsAddRoomOpen(true); 
  };

  const closeAddRoomModal = () => {
    setIsAddRoomOpen(false);
  };

  const handleAddRoom = (roomData: any) => {
    setRooms([...rooms, roomData]); 
    console.log("Room added:", roomData);
  };

  return (
    <article className="room-page-container">
      <Title titleText="Room" className="title" />
      <Label handleClick={handleAddRoomClick} />
      <TableRoom />
      <Pagination />
      {isAddRoomOpen && (
        <AddRoomModal onClose={closeAddRoomModal} onAddRoom={handleAddRoom} />
      )}
    </article>
  );
}
