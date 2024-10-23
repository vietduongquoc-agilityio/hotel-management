interface DeleteRoomProps {
  room: { id: string; roomNumber: string };
  onClose: () => void;
}

export default function DeleteRoom({ room, onClose }: DeleteRoomProps) {
  return (
    <div className="modal">
      <h2>Are you sure you want to delete Room {room.roomNumber}?</h2>
      <button onClick={onClose}>Cancel</button>
      <button>Confirm Delete</button>
    </div>
  );
}
