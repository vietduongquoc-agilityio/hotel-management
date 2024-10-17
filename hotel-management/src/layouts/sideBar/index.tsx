import { Link } from "react-router-dom";
import "./index.css";

export interface SidebarProps {
  room: string;
  logo: string;
  rate: string;
}

export default function Sidebar({ room, logo, rate }: SidebarProps) {
  return (
    <aside className="sidebar-container">
      <figure className="sidebar-logo">
        <Link className="link-homepage" to="/">
          <img src={logo} alt="Logo" className="logo-icon" />
        </Link>
      </figure>
      <ul className="list-sidebar-link">
        <li className="wrap-sidebar-link">
          <Link to="/" className="sidebar-link">
            <img src={room} alt="Room" className="sidebar-icon" />
            <span className="sidebar-title-room">Room</span>
          </Link>
        </li>
        <li className="wrap-sidebar-link">
          <Link to="/" className="sidebar-link">
            <img src={rate} alt="Rate" className="sidebar-icon" />
            <span className="sidebar-title-rate">Rate</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
