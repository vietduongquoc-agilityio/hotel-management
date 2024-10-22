/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { getRates } from "../../../services/rateServices";
import Button from "../../button";
import EditRate from "../../modal/rateModal/edit";
import DeleteRate from "../../modal/rateModal/delete";
import "./index.css";

interface RateData {
  id: string;
  roomType: string;
  cancellationPolicy: string;
  deals: string;
  dealPrice: string;
  rate: string;
  availability: string;
  rateNumber: string;
}

export default function TableRate() {
  const [rates, setRates] = useState<RateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRate, setSelectedRate] = useState<RateData | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [activeRateId, setActiveRateId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRateData = async () => {
      try {
        const data = await getRates(1, 10, "roomType:ASC");
        if (data && Array.isArray(data.data)) {
          setRates(data.data);
        } else {
          setError("Unexpected data format");
        }
      } catch (error) {
        setError("Failed to fetch rate data");
      } finally {
        setLoading(false);
      }
    };
    fetchRateData();
  }, []);

  const handleEdit = (rate: RateData) => {
    setSelectedRate(rate);
    setIsEditOpen(true);
    setActiveRateId(null);
  };

  const handleDelete = (rate: RateData) => {
    setSelectedRate(rate);
    setIsDeleteOpen(true);
    setActiveRateId(null);
  };

  const toggleMenu = (rateId: string) => {
    setActiveRateId((prev) => (prev === rateId ? null : rateId));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="wrap-table">
      <ul className="wrap-rate-table-title">
        <li className="rate-table-row-one">Room type</li>
        <li className="rate-table-row-second">Deals</li>
        <li className="rate-table-row-third">Cancellation policy</li>
        <li className="rate-table-row-four">Deal price</li>
        <li className="rate-table-row-five">Rate</li>
        <li className="rate-table-row-six">Availability</li>
      </ul>
      {rates.map((rate) => (
        <ul key={rate.id} className="wrap-table-content">
          <li className="item rate-table-row-one">{rate.roomType}</li>
          <li className="item rate-table-row-second">{rate.deals}</li>
          <li className="item rate-table-row-third">
            {rate.cancellationPolicy}
          </li>
          <li className="item rate-table-row-four">{rate.dealPrice}</li>
          <li className="item rate-table-row-five">{rate.rate}</li>
          <li className="item rate-table-row-six">{rate.availability}</li>
          <li className="rate-action">
            <Button
              className="btn-toggle"
              label="⋮"
              toggle
              handleClick={() => toggleMenu(rate.id)}
              backgroundColor="#ffffff"
              border="none"
              color="#5d6679"
            />
            {activeRateId === rate.id && (
              <div className="dropdown-menu">
                <button className="action-btn" onClick={() => handleEdit(rate)}>
                  Edit
                </button>
                <button
                  className="action-btn"
                  onClick={() => handleDelete(rate)}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        </ul>
      ))}

      {isEditOpen && selectedRate && (
        <EditRate rate={selectedRate} onClose={() => setIsEditOpen(false)} />
      )}
      {isDeleteOpen && selectedRate && (
        <DeleteRate
          rate={selectedRate}
          onClose={() => setIsDeleteOpen(false)}
        />
      )}
    </div>
  );
}
