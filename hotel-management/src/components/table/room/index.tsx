/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { getRooms } from "../../../services/roomService";
import Button from "../../button";
import EditRoom from "../../modal/roomModal/edit";
import DeleteRoom from "../../modal/roomModal/delete";
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
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const data = await getRooms(1, 10, "bedType:ASC");
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

  const handleEdit = (room: RoomData) => {
    setSelectedRoom(room);
    setIsEditOpen(true);
    setActiveRoomId(null);
  };

  const handleDelete = (room: RoomData) => {
    setSelectedRoom(room);
    setIsDeleteOpen(true);
    setActiveRoomId(null);
  };

  const toggleMenu = (roomId: string) => {
    setActiveRoomId((prev) => (prev === roomId ? null : roomId));
  };

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
          <li className="action">
            <Button
              label="⋮"
              toggle
              handleClick={() => toggleMenu(room.id)}
              className="btn-toggle"
              backgroundColor="#ffffff"
              border="none"
              color="#5d6679"
            />

            {activeRoomId === room.id && (
              <div className="dropdown-menu">
                <button className="action-btn" onClick={() => handleEdit(room)}>
                  Edit
                </button>
                <button
                  className="action-btn"
                  onClick={() => handleDelete(room)}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        </ul>
      ))}

      {isEditOpen && selectedRoom && (
        <EditRoom room={selectedRoom} onClose={() => setIsEditOpen(false)} />
      )}
      {isDeleteOpen && selectedRoom && (
        <DeleteRoom
          room={selectedRoom}
          onClose={() => setIsDeleteOpen(false)}
        />
      )}
    </div>
  );
}
