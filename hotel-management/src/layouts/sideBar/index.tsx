import room from "../../assets/icons/room.svg";
import logo from "../../assets/icons/logo.svg";
import rate from "../../assets/icons/rate.svg";
import { Link } from "react-router-dom";
import "./index.css";

const Sidebar = () => {
  return (
    <aside className="sidebar-container">
      <figure className="sidebar-logo">
        <a className="link-homepage" href="/">
          <img src={logo} alt="Logo" className="Logo-icon" />
        </a>
      </figure>
      <ul className="list-sidebar-link">
        <li className="wrap-sidebar-link">
          <Link to="/" className="sidebar-link">
            <img src={room} alt="room" className="sidebar-icon" />
            <span className="sidebar-title-room">Room</span>
          </Link>
        </li>
        <li className="wrap-sidebar-link">
          <Link to="/" className="sidebar-link">
            <img src={rate} alt="rate" className="sidebar-icon" />
            <span className="sidebar-title-rate">Rate</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
