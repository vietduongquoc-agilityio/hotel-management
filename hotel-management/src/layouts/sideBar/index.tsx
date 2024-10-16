import room from '../../assets/icons/room.png'
import logo from '../../assets/icons/logo.png'
import rate from '../../assets/icons/rate.png'
import { Link } from 'react-router-dom';
import React from 'react';

const Sidebar = () => {
    return (
        <div className="sidebar-container">
            <aside className='sidebar'>
                <figure className="sidebar-Logo">
                    <a className='link-homepage' href="/"><img src={logo} alt="Logo" className="Logo-icon" /></a>
                </figure>
                <ul className='list-sidebar-link'>
                    <li className='sidebar-link'>
                        <Link to="/">
                            <img src={room} alt="Home" className="sidebar-icon" />
                            <span className='sidebar-title-room'>Room</span>
                        </Link>
                    </li>
                    <li className='sidebar-link'>
                        <Link to="/">
                            <img src={rate} alt="rate" className="sidebar-icon" />
                            <span className='sidebar-title-rate'>rate</span>
                        </Link>
                    </li>
                </ul>
            </aside>
        </div >
    );
};

export default Sidebar;