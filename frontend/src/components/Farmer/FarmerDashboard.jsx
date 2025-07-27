import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { logout } from '../slices/authSlice'; // Redux logout action

const FarmerDashboard = () => {
  const { username, userid, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   dispatch(logout());         // Clear Redux state
  //   navigate('/');              // Redirect to login page
  // };

  return (
    <div style={styles.container}>
      <h2>Welcome, {username}!</h2>
      <p>This is your Farmer Dashboard.</p>

      <div style={styles.infoBox}>
        <p><strong>User ID:</strong> {userid}</p>
        <p><strong>Role:</strong> {role}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    minHeight: '80vh',
  },
  infoBox: {
    marginTop: '20px',
    display: 'inline-block',
    textAlign: 'left',
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    minWidth: '250px',
  },
};

export default FarmerDashboard;
