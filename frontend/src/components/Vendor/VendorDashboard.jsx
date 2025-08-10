
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const VendorDashboard = () => {
  const { username, userid, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Welcome, {username}!</h2>
      </div>

      <div style={styles.info}>
        <p><strong>User ID:</strong> {userid}</p>
        <p><strong>Role:</strong> {role}</p>
      </div>

      <div style={styles.grid}>
    
        <button
          onClick={() => handleNavigation('/vendor/VendorProductCart')}
          style={styles.card}
        >
          View My Products
        </button>
          <button
          onClick={() => handleNavigation('/vendor/AddVendorProductsByCategory')}
          style={styles.card}
        >
          View All Products and Add price
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
    backgroundColor: '#69c46eff',
    color: 'white',
    borderRadius: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
};

export default VendorDashboard;
