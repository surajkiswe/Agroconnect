import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Welcome Admin</h2>

      <div style={styles.grid}>
        <button
          onClick={() => handleNavigation('/admin/product_operation')}
          style={styles.card}
        >
          Products
        </button>

        <button
          onClick={() => handleNavigation('/admin/allusers')}
          style={styles.card}
        >
          Manage Users
        </button>
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
    fontSize: '28px',
    marginBottom: '30px',
    color: '#2c3e50',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '20px',
  },
  card: {
    padding: '20px',
    backgroundColor: '#28a745',
    color: 'white',
    borderRadius: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
};

export default AdminDashboard;
