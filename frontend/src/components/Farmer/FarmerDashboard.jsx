import React from 'react';
import { Link } from 'react-router-dom';

const FarmerDashboard = () => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Farmer Dashboard</h2>
      <div className="row">
        <div className="col-md-3">
          <Link to="/farmer/profile" className="btn btn-outline-primary w-100 mb-3">View Profile</Link>
          <Link to="/farmer/products" className="btn btn-outline-success w-100 mb-3">View Products</Link>
          <Link to="/farmer/schemes" className="btn btn-outline-warning w-100 mb-3">View Schemes</Link>
          <Link to="/farmer/subsidy" className="btn btn-outline-info w-100 mb-3">Request Subsidy</Link>
        </div>
        <div className="col-md-9">
          <p>Select an option to get started.</p>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
