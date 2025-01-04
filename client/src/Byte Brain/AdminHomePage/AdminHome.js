// AdminHome.js
import React from 'react';
import AdminEvent from './AdminComponent/AdminEvent';
import AdminFooter from './AdminComponent/AdminFooter';
import AdminImage from './AdminComponent/AdminImage';
import AdminNews from './AdminComponent/AdminNews';
import AdminTeammates from './AdminComponent/AdminTeammates';
// import './AdminHome.css';

const AdminHome = () => {
  return (
    <div className="admin-home">
      <h1>Admin Dashboard</h1>
      <AdminNews/>
      <AdminImage/>
      <AdminEvent />
      <h1>Team members manage</h1>
      <AdminTeammates/>
      <AdminFooter/>
    </div>
  );
};

export default AdminHome;
