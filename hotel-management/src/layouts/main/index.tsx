import Sidebar from '../sideBar';
import React from 'react';

const MainLayout = ({ component }) => {
    return (
        <div className="main-layout-container">
            <Sidebar />
        </div>
    );
};

export default MainLayout;