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


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const FarmerDashboard = () => {
  const { username, userid, role } = useSelector((state) => state.auth);
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/scheme/all')
      .then(res => setSchemes(res.data))
      .catch(err => console.error('Error fetching schemes:', err));
  }, []);

  return (
    <div style={styles.container}>
      <h1>Welcome, {username}!</h1>

      <h3>Available Schemes</h3>
      <div style={styles.schemeContainer}>
        {schemes.length === 0 ? (
          <p>No schemes available.</p>
        ) : (
          schemes.map((scheme) => (
            <div key={scheme.schemeid} style={styles.schemeCard}>
              <h4>{scheme.schemename}</h4>
              <p><strong>Eligibility:</strong> {scheme.eligibility}</p>
              <p><strong>Valid:</strong> {scheme.startdate} to {scheme.lastdate}</p>
              <p>{scheme.description}</p>
              <a href={scheme.url} target="_blank" rel="noopener noreferrer">
                <button style={styles.applyBtn}>Apply</button>
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '50px',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    minHeight: '80vh',
  },
  infoBox: {
    marginBottom: '30px',
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    maxWidth: '400px',
  },
  schemeContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
  },
  schemeCard: {
    border: '1px solid #ccc',
    padding: '15px',
    borderRadius: '10px',
    width: '300px',
    backgroundColor: '#e9f7ef',
  },
  applyBtn: {
    marginTop: '10px',
    padding: '8px 16px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default FarmerDashboard;