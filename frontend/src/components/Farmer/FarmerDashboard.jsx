// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// // import { logout } from '../slices/authSlice'; // Redux logout action

// const FarmerDashboard = () => {
//   const { username, userid, role } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // const handleLogout = () => {
//   //   dispatch(logout());         // Clear Redux state
//   //   navigate('/');              // Redirect to login page
//   // };

//   return (
//     <div style={styles.container}>
//       <h2>Welcome, {username}!</h2>
//       <p>This is your Farmer Dashboard.</p>

//       <div style={styles.infoBox}>
//         <p><strong>User ID:</strong> {userid}</p>
//         <p><strong>Role:</strong> {role}</p>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     marginTop: '50px',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     fontFamily: 'Arial, sans-serif',
//     minHeight: '80vh',
//   },
//   infoBox: {
//     marginTop: '20px',
//     display: 'inline-block',
//     textAlign: 'left',
//     border: '1px solid #ccc',
//     padding: '20px',
//     borderRadius: '10px',
//     backgroundColor: '#f9f9f9',
//     minWidth: '250px',
//   },
// };

// export default FarmerDashboard;
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FarmerDashboard = () => {
  const { username, userid, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.dashboard}>
      <h2 style={styles.heading}>Welcome, {username}!</h2>
      <p style={styles.subtitle}>This is your Farmer Dashboard.</p>

      <div style={styles.infoBox}>
        <p><strong>User ID:</strong> {userid}</p>
        <p><strong>Role:</strong> {role}</p>
      </div>

      <div style={styles.cardContainer}>
        <div
          style={styles.card}
          onMouseEnter={(e) => e.currentTarget.style = {...styles.card, ...styles.cardHover}}
          onMouseLeave={(e) => e.currentTarget.style = styles.card}
          onClick={() => handleNavigation('/farmer/ViewSchemes')}
        >
          <h3 style={styles.cardTitle}>View Schemes</h3>
          <p style={styles.cardText}>Check available government schemes for farmers.</p>
        </div>

        <div
          style={styles.card}
          onMouseEnter={(e) => e.currentTarget.style = {...styles.card, ...styles.cardHover}}
          onMouseLeave={(e) => e.currentTarget.style = styles.card}
          onClick={() => handleNavigation('/farmer/viewproducts')}
        >
          <h3 style={styles.cardTitle}>View Products</h3>
          <p style={styles.cardText}>Browse all farming products by category.</p>
        </div>

        <div
          style={styles.card}
          onMouseEnter={(e) => e.currentTarget.style = {...styles.card, ...styles.cardHover}}
          onMouseLeave={(e) => e.currentTarget.style = styles.card}
          onClick={() => handleNavigation('/cart')}
        >
          <h3 style={styles.cardTitle}>Add to Cart</h3>
          <p style={styles.cardText}>View and manage items in your cart.</p>
        </div>

        <div
          style={styles.card}
          onMouseEnter={(e) => e.currentTarget.style = {...styles.card, ...styles.cardHover}}
          onMouseLeave={(e) => e.currentTarget.style = styles.card}
          onClick={() => handleNavigation('/orders')}
        >
          <h3 style={styles.cardTitle}>Orders</h3>
          <p style={styles.cardText}>Track your past and current orders.</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  dashboard: {
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    minHeight: '80vh',
    padding: '20px'
  },
  heading: {
    fontSize: '1.8rem',
    textAlign: 'center',
    marginBottom: '5px'
  },
  subtitle: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '15px',
    textAlign: 'center'
  },
  infoBox: {
    display: 'inline-block',
    textAlign: 'left',
    border: '1px solid #ccc',
    padding: '15px',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    minWidth: '250px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
  },
  cardContainer: {
    marginTop: '30px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    width: '100%',
    maxWidth: '1000px',
    padding: '10px'
  },
  card: {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #ffffff, #f4f4f4)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    textAlign: 'center',
    minHeight: '150px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  },
  cardHover: {
    transform: 'translateY(-5px) scale(1.02)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
    background: 'linear-gradient(135deg, #f0fff0, #d8ffd8)'
  },
  cardTitle: {
    marginBottom: '10px',
    color: '#2c662d'
  },
  cardText: {
    fontSize: '0.95rem',
    color: '#555'
  }
};

export default FarmerDashboard;
