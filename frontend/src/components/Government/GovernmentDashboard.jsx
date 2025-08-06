import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';

const GovernmentDashboard = () => {
  const { fname, lname } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Welcome, {fname} {lname}.</h2>
      </div>

      <div style={styles.info}>
        <p>Some Information</p>
      </div>

      <div style={styles.grid}>
        <button onClick={() => handleNavigation('/government/addscheme')} style={styles.card}>Add Scheme</button>
        <button onClick={() => handleNavigation('/government/viewschemes')} style={styles.card}>View Schemes</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f5f7fb',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px',
  },
  info: {
    marginTop: '20px',
    fontSize: '18px',
    color: '#555',
    marginBottom: '30px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '20px',
  },
  card: {
    padding: '20px',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
};

export default GovernmentDashboard;
