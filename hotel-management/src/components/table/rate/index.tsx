/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { getRates } from "../../../services/rateServices";
import "../index.css";

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
      <ul className="wrap-table-title">
        <li className="table-row-one">Room type</li>
        <li className="table-row-second">Deals</li>
        <li className="table-row-third">Cancellation policy</li>
        <li className="table-row-four">Deal price</li>
        <li className="table-row-five">Rate</li>
        <li className="table-row-five">Availability</li>
      </ul>
      {rates.map((rate) => (
        <ul key={rate.id} className="wrap-table-content">
          <li className="item table-row-one">{rate.roomType}</li>
          <li className="item table-row-second">{rate.deals}</li>
          <li className="item table-row-third">{rate.cancellationPolicy}</li>
          <li className="item table-row-four">{rate.dealPrice}</li>
          <li className="item table-row-five">{rate.rate}</li>
          <li className="item table-row-five">{rate.availability}</li>
          <li className="action">toggle </li>
        </ul>
      ))}
    </div>
  );
}
