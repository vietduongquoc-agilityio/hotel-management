/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { getRates } from "../../../services/rateServices";
import "./index.css";

interface RoomData {
  id: string;
  roomType: string;
  cancellationPolicy: string;
  deals: string;
  dealPrice: string;
  rate: string;
  availability: string;
}

export default function TableRate() {
  const [rates, setRates] = useState<RoomData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRateData = async () => {
      try {
        const data = await getRates(1, 10, "bedType:ASC");
        console.log(data);
        if (data && Array.isArray(data.data)) {
          setRates(data.data);
        } else {
          setError("Unexpected data format");
        }
      } catch (error) {
        setError("Failed to fetch room data");
      } finally {
        setLoading(false);
      }
    };
    fetchRateData();
  }, []);

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
          <li className="rate-action">toggle </li>
        </ul>
      ))}
    </div>
  );
}
