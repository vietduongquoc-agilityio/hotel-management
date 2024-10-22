interface EditRateProps {
  rate: { id: string; rateNumber: string };
  onClose: () => void;
}

export default function EditRate({ rate, onClose }: EditRateProps) {
  return (
    <div className="modal">
      <h2>Edit Rate {rate.rateNumber}</h2>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
