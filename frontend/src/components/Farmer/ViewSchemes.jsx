import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ViewSchemes = () => {
  const navigate = useNavigate();
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
      if (fid === null) {
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
      setSchemes(prev => prev.map(s => s.schemeid === schemeid ? { ...s, applied: true, canApply: false } : s));
    } catch (error) {
      console.error('Apply failed:', error);
      const msg = error?.response?.data?.message || 'Apply failed';
      alert(msg);
    } finally {
      setApplyingFor(null);
    }
  };

  if (loading) return <div style={styles.container}><p>Loading...</p></div>;

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
                  <span style={styles.appliedText}>applied</span>
                ) : scheme.canApply ? (
                  <button
                    style={styles.applyBtn}
                    onClick={() => handleApply(scheme.schemeid)}
                    disabled={applyingFor === scheme.schemeid}
                  >
                    {applyingFor === scheme.schemeid ? 'Applying...' : 'Apply'}
                  </button>
                ) : (
                  <span style={styles.notApplicableText}>Not Eligible</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Back to Dashboard Button */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/farmer/dashboard')}
        >
          Back to Dashboard
        </button>
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

export default ViewSchemes;
