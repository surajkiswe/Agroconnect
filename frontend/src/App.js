import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage';
import FarmerLogin from './components/Farmer/FarmerLogin';
import VendorLogin from './components/Vendor/VendorLogin';
import GovernmentLogin from './components/Government/GovernmentLogin';
import AdminLogin from './components/Admin/AdminLogin';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/farmer/login" element={<FarmerLogin />} />
        <Route path="/vendor/login" element={<VendorLogin />} />
        <Route path="/government/login" element={<GovernmentLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
