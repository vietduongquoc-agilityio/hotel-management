interface DeleteRateProps {
  rate: { id: string; rateNumber: string };
  onClose: () => void;
}

export default function DeleteRate({ rate, onClose }: DeleteRateProps) {
  return (
    <div className="modal">
      <h2>Are you sure you want to delete rate {rate.rateNumber}?</h2>
      <button onClick={onClose}>Cancel</button>
      <button>Confirm Delete</button>
    </div>
  );
}
