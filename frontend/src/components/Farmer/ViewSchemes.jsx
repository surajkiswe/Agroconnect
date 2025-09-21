// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { useNavigate, Link } from 'react-router-dom';

// const ViewScheme = () => {
//   const auth = useSelector((state) => state.auth);
//   const navigate = useNavigate();
//   const [schemes, setSchemes] = useState([]);

//   const gid = auth?.gid || localStorage.getItem("gid");

//   useEffect(() => {
//     if (gid) {
//       localStorage.setItem("gid", gid);
//       const fetchSchemes = async () => {
//         try {
//           const res = await axios.get(`http://localhost:8083/api/Government/getSchemes/${gid}`);
//           setSchemes(res.data);
//         } catch (err) {
//           console.error('Error fetching schemes:', err);
//         }
//       };
//       fetchSchemes();
//     } else {
//       console.error("No Government ID found. Redirecting to login.");
//       navigate('/gov-login');
//     }
//   }, [gid, navigate]);

//   const handleDelete = async (schemeid) => {
//     if (!window.confirm('Are you sure you want to delete this scheme?')) return;

//     try {
//       await axios.delete(`http://localhost:8080/api/Government/deleteScheme/${schemeid}`);
//       setSchemes(schemes.filter((s) => s.schemeid !== schemeid));
//     } catch (error) {
//       console.error('Error deleting scheme:', error);
//     }
//   };

//   return (
//     <div style={{ padding: '30px' }}>
//       <h2 className="mb-4">My Government Schemes</h2>

//       {/* <div className="mb-3">
//         <Link to="/allschemes" className="btn btn-outline-secondary">
//           View All Government Schemes
//         </Link>
//       </div> */}

//       {schemes.length === 0 ? (
//         <p>No schemes found.</p>
//       ) : (
//         <table className="table table-bordered table-striped">
//           <thead className="table-dark">
//             <tr>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Eligibility</th>
//               <th>Income</th>
//               <th>Land Size</th>
//               <th>Start Date</th>
//               <th>End Date</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {schemes.map((scheme) => (
//               <tr key={scheme.schemeid}>
//                 <td>{scheme.schemename}</td>
//                 <td>{scheme.description}</td>
//                 <td>{scheme.eligibility}</td>
//                 <td>{scheme.income}</td>
//                 <td>{scheme.landsize}</td>
//                 <td>{new Date(scheme.startdate).toLocaleDateString()}</td>
//                 <td>{new Date(scheme.lastdate).toLocaleDateString()}</td>
//                 <td>
//                   <div className="d-flex gap-2">
//                     <button
//                       className="btn btn-sm btn-primary"
//                       onClick={() => navigate(`/editscheme/${scheme.schemeid}`)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="btn btn-sm btn-danger"
//                       onClick={() => handleDelete(scheme.schemeid)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <button
//         onClick={() => navigate('/farmer/dashboard')}
//         className="btn btn-secondary mt-4"
//       >
//         ← Back to Dashboard
//       </button>
//     </div>
//   );
// };

// export default ViewScheme;

// src/components/FarmerDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const FarmerDashboard = () => {
  const auth = useSelector((state) => state.auth || {});
  const username = auth.username ?? auth.fname ?? auth.user?.username ?? auth.user?.fname ?? 'Farmer';

  const effectiveUserId =
    auth.userid ?? auth.userId ?? auth.uid ?? auth.user?.uid ?? auth.user?.id ?? null;

  const [farmer, setFarmer] = useState(null);
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applyingFor, setApplyingFor] = useState(null);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveUserId]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (!effectiveUserId) {
        console.warn('No user id found in auth state', auth);
        const all = await axios.get('http://localhost:8081/scheme/all');
        setSchemes((all.data || []).map(s => ({ ...s, canApply: false, applied: false })));
        setFarmer(null);
        return;
      }

      const farmerRes = await axios.get(`http://localhost:8081/farmer/${effectiveUserId}`);
      const farmerData = farmerRes.data;
      if (!farmerData) {
        console.warn('No farmer record for uid', effectiveUserId);
        const all = await axios.get('http://localhost:8081/scheme/all');
        setSchemes((all.data || []).map(s => ({ ...s, canApply: false, applied: false })));
        setFarmer(null);
        return;
      }
      setFarmer(farmerData);

      const fid = farmerData.fid ?? farmerData.id ?? null;
      if (fid === null || typeof fid === 'undefined') {
        console.warn('Farmer record does not include fid; falling back to all schemes', farmerData);
        const all = await axios.get('http://localhost:8081/scheme/all');
        setSchemes((all.data || []).map(s => ({ ...s, canApply: false, applied: false })));
        return;
      }

      const schemesRes = await axios.get(`http://localhost:8081/scheme/forFarmer/${fid}`);
      setSchemes(schemesRes.data || []);
    } catch (err) {
      console.error('Error loading data:', err);
      try {
        const all = await axios.get('http://localhost:8081/scheme/all');
        setSchemes((all.data || []).map(s => ({ ...s, canApply: false, applied: false })));
      } catch (e) {
        console.error('Failed to fetch backup scheme list', e);
        setSchemes([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (schemeid) => {
    if (!farmer || !farmer.fid) {
      alert('Farmer details missing. Cannot apply.');
      return;
    }
    setApplyingFor(schemeid);
    try {
      await axios.post('http://localhost:8081/scheme/apply', {
        fid: farmer.fid,
        schemeid: schemeid,
      });
      setSchemes(prev =>
        prev.map(s => s.schemeid === schemeid ? { ...s, applied: true, canApply: false } : s)
      );
    } catch (error) {
      console.error('Apply failed:', error);
      const msg = error?.response?.data?.message || 'Apply failed';
      alert(msg);
    } finally {
      setApplyingFor(null);
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <p>Loading...</p>
      </div>
    );
  }

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
              <p><strong>Valid:</strong> {scheme.startdate ?? 'N/A'} to {scheme.lastdate ?? 'N/A'}</p>
              <p>{scheme.description}</p>

              <div style={{ marginTop: 10 }}>
                {scheme.applied ? (
                  <span style={styles.appliedText}>Applied</span>
                ) : scheme.canApply ? (
                  <button
                    style={styles.applyBtn}
                    onClick={() => handleApply(scheme.schemeid)}
                    disabled={applyingFor === scheme.schemeid}
                  >
                    {applyingFor === scheme.schemeid ? 'Applying...' : 'Apply'}
                  </button>
                ) : (
                  <span style={styles.notApplicableText}>Not Applicable</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: '40px',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    minHeight: '70vh',
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
  appliedText: {
    display: 'inline-block',
    padding: '8px 12px',
    borderRadius: 6,
    backgroundColor: '#d1ecf1',
    color: '#0c5460',
    fontWeight: 'bold',
  },
  notApplicableText: {
    display: 'inline-block',
    padding: '6px 10px',
    borderRadius: 6,
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
};

export default FarmerDashboard;
