import { useState } from "react";
import "./index.css";
import Button from "../../../button";

interface AddRoomModalProps {
  onClose: () => void;
  onAddRoom: (roomData: any) => void;
}

export default function AddRoomModal({
  onClose,
  onAddRoom,
}: AddRoomModalProps) {
  const [bedType, setBedType] = useState("");
  const [floor, setFloor] = useState("");
  const [status, setStatus] = useState("");
  const [facilityDescription, setFacilityDescription] = useState("");

  const handleSubmit = () => {
    if (!bedType || !floor || !status) {
      alert("Please fill in all required fields.");
      return;
    }

    const newRoomData = { bedType, floor, status, facilityDescription };
    onAddRoom(newRoomData);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-content-title">Add New Room</h2>
        <form>
          <div>
            <label>Bed type</label>
            <select
              value={bedType}
              onChange={(e) => setBedType(e.target.value)}
            >
              <option value="">Select bed type</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Queen">Queen</option>
              <option value="King">King</option>
            </select>
          </div>
          <div>
            <label>Room floor</label>
            <select value={floor} onChange={(e) => setFloor(e.target.value)}>
              <option value="">Select floor</option>
              <option value="Ground Floor">Ground Floor</option>
              <option value="1st Floor">1st Floor</option>
              <option value="2nd Floor">2nd Floor</option>
            </select>
          </div>
          <div>
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Select status</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Under Maintenance">Under Maintenance</option>
              <option value="Out of Order">Out of Order</option>
            </select>
          </div>
          <div>
            <label>Room facility</label>
            <textarea
              value={facilityDescription}
              onChange={(e) => setFacilityDescription(e.target.value)}
              maxLength={500}
            />
          </div>
        </form>
        <div className="modal-actions">
          <Button
            label="Cancel"
            handleClick={onClose}
            borderRadius={4}
            backgroundColor="#f0f1f3"
            color="#000"
            size="md"
            width={100}
            height={40}
            border="none"
          />
          <Button
            label="Add"
            handleClick={handleSubmit}
            borderRadius={4}
            backgroundColor="#1570ef"
            color="#fff"
            size="md"
            width={100}
            height={40}
            border="none"
          />
        </div>
      </div>
    </div>
  );
}
