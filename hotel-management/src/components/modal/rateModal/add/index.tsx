import { useState } from "react";
import "./index.css";
import Button from "../../../button";
import Select, { Option } from "../../../select";

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

  const bedTypeOptions: Option[] = [
    { value: "Single", label: "Single" },
    { value: "Double", label: "Double" },
    { value: "Queen", label: "Queen" },
    { value: "King", label: "King" },
  ];

  const floorOptions: Option[] = [
    { value: "Ground Floor", label: "Ground Floor" },
    { value: "1st Floor", label: "1st Floor" },
    { value: "2nd Floor", label: "2nd Floor" },
  ];

  const statusOptions: Option[] = [
    { value: "Available", label: "Available" },
    { value: "Occupied", label: "Occupied" },
    { value: "Under Maintenance", label: "Under Maintenance" },
    { value: "Out of Order", label: "Out of Order" },
  ];

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
      <div className="wrap-modal-content">
        <h2 className="modal-content-title">Add New Room</h2>
        <form className="modal-content">
          <div className="modal-content-row-one">
            <Select
              width={320}
              options={bedTypeOptions}
              value={bedType}
              onChange={setBedType}
              label="Bed type"
              height={40}
            />
            <Select
              width={320}
              options={floorOptions}
              value={floor}
              onChange={setFloor}
              label="Room floor"
              height={40}
            />
          </div>
          <div className="modal-content-row-two">
            <div>
              <label className="select-label">Room facility</label>
              <textarea
                className="modal-content-row-two-desc"
                value={facilityDescription}
                onChange={(e) => setFacilityDescription(e.target.value)}
                maxLength={500}
                placeholder="Enter a description...."
              />
            </div>
            <Select
              options={statusOptions}
              value={status}
              onChange={setStatus}
              label="Status"
              width={320}
              height={40}
            />
          </div>
        </form>
        <div className="modal-actions">
          <Button
            className="btn-cancel"
            label="Cancel"
            handleClick={onClose}
            borderRadius={8}
            backgroundColor="#ffffff"
            color="#667085"
            size="md"
            width={100}
            height={40}
            border="1px solid #667085"
            fontSize="14"
            fontWeight="500"
          />
          <Button
            className="btn-add"
            label="Add"
            handleClick={handleSubmit}
            borderRadius={8}
            backgroundColor="#1570ef"
            color="#ffffff"
            size="md"
            width={100}
            height={40}
            border="none"
            fontSize="14"
            fontWeight="500"
          />
        </div>
      </div>
    </div>
  );
}
