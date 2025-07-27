import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import GovernmentDashboard from './components/Government/GovernmentDashboard';
import VendorDashboard from './components/Vendor/VendorDashboard';
import Admindashboard from './components/Admin/AdminDashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GovernmentDashboard/>
);
 