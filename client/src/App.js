import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminEvent from './Byte Brain/AdminHomePage/AdminComponent/AdminEvent';
import AdminFooter from './Byte Brain/AdminHomePage/AdminComponent/AdminFooter';
import AdminImage from './Byte Brain/AdminHomePage/AdminComponent/AdminImage';
import AdminNews from './Byte Brain/AdminHomePage/AdminComponent/AdminNews';
import AdminTeammates from './Byte Brain/AdminHomePage/AdminComponent/AdminTeammates';
import AdminHome from './Byte Brain/AdminHomePage/AdminHome';
import Home from './Byte Brain/Homepage/Home';
import Footer from './Byte Brain/Homepage/HomeComponent/Footer';
import Image from './Byte Brain/Homepage/HomeComponent/Image';
import Main from './Byte Brain/Homepage/Main';
import Teammates from './Byte Brain/Homepage/Teammates';
import LoginHome from './Byte Brain/Login/LoginHome';
import Navbar from './Byte Brain/Navbar/Navbar';

function App() {
  // Check if the user is authenticated by looking for the token in localStorage
  const isAuthenticated = !!localStorage.getItem('token');
  
  console.log("Is authenticated:", isAuthenticated);  // Debugging line
  console.log("JWT token in localStorage:", localStorage.getItem('token'));  // Debugging line

  return (
    <BrowserRouter className="app">
      <Navbar />
      <Routes>
        {/* Non-protected routes */}
        {/* <Route path="/" element={<Test />} /> */}
        <Route path="/" element={<Main />} />
        <Route path="/event" element={<Home />} />
        <Route path="/team" element={<Teammates />} />
        <Route path="/contact" element={<Footer />} />
        <Route path="/image" element={<Image />} />
        <Route path="/login" element={<LoginHome />} />

        {/* Protected routes: Only accessible if the user is logged in */}
        <Route
          path="/admin"
          element={isAuthenticated ? <AdminHome /> : <Navigate to="/login" />}
        />
        <Route
          path="/adminEvent"
          element={isAuthenticated ? <AdminEvent /> : <Navigate to="/login" />}
        />
        <Route
          path="/adminTeammate"
          element={isAuthenticated ? <AdminTeammates /> : <Navigate to="/login" />}
        />
        <Route
          path="/gallery"
          element={isAuthenticated ? <AdminImage /> : <Navigate to="/login" />}
        />
        <Route
          path="/adminNews"
          element={isAuthenticated ? <AdminNews /> : <Navigate to="/login" />}
        />
        <Route
          path="/adminFooter"
          element={isAuthenticated ? <AdminFooter /> : <Navigate to="/login" />}
        />
        <Route
          path="/adminNews"
          element={isAuthenticated ? <AdminNews /> : <Navigate to="/login" />}
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
