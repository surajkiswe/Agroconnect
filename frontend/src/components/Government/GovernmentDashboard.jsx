import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const GovernmentDashboard = () => {
  const { username, userid, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>Welcome, {username}!</h2>
      <p>This is your Government Dashboard.</p>
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
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif'
  },
  infoBox: {
    marginTop: '20px',
    display: 'inline-block',
    textAlign: 'left',
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9'
  },
};

export default GovernmentDashboard;
