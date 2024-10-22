interface EditRoomProps {
  room: { id: string; roomNumber: string };
  onClose: () => void;
}

export default function EditRoom({ room, onClose }: EditRoomProps) {
  return (
    <div className="modal">
      <h2>Edit Room {room.roomNumber}</h2>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
