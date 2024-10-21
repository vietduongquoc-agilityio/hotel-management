/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { getRooms } from "../../../services/roomService";
import "./index.css";

interface RoomData {
  id: string;
  roomNumber: string;
  bedType: string;
  roomFloor: string;
  roomFacility: string;
  Available: string;
}

export default function TableRoom() {
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const data = await getRooms(1, 10, "bedType:ASC");
        console.log(data);
        if (data && Array.isArray(data.data)) {
          setRooms(data.data);
        } else {
          setError("Unexpected data format");
        }
      } catch (error) {
        setError("Failed to fetch room data");
      } finally {
        setLoading(false);
      }
    };
    fetchRoomData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="wrap-table">
      <ul className="wrap-table-title">
        <li className="table-row-one">Room number</li>
        <li className="table-row-second">Bed type</li>
        <li className="table-row-third">Room floor</li>
        <li className="table-row-four">Room facility</li>
        <li className="table-row-five">Status</li>
      </ul>
      {rooms.map((room) => (
        <ul key={room.id} className="wrap-table-content">
          <li className="item table-row-one">{room.roomNumber}</li>
          <li className="item table-row-second">{room.bedType}</li>
          <li className="item table-row-third">{room.roomFloor}</li>
          <li className="item table-row-four">{room.roomFacility}</li>
          <li className="item table-row-five">{room.Available}</li>
          <li className="action">toggle </li>
        </ul>
      ))}
    </div>
  );
}
