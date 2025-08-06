import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
// import { FaEdit, FaTrash } from 'react-icons/fa'; // optional if you want icons


const ViewScheme = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [schemes, setSchemes] = useState([]);

  const gid = auth?.gid || localStorage.getItem("gid");

  useEffect(() => {
    if (gid) {
      localStorage.setItem("gid", gid);
      const fetchSchemes = async () => {
        try {
          const res = await axios.get(`http://localhost:8083/api/government/getSchemes/${gid}`);
          setSchemes(res.data);
        } catch (err) {
          console.error('Error fetching schemes:', err);
        }
      };
      fetchSchemes();
    } else {
      console.error("No Government ID found. Redirecting to login.");
      navigate('/gov-login');
    }
  }, [gid, navigate]);

  const handleDelete = async (schemeid) => {
    if (!window.confirm('Are you sure you want to delete this scheme?')) return;

    try {
      await axios.delete(`http://localhost:8083/api/government/deleteScheme/${schemeid}`);
      setSchemes(schemes.filter((s) => s.schemeid !== schemeid));
    } catch (error) {
      console.error('Error deleting scheme:', error);
    }
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2 className="mb-4">My Government Schemes</h2>

      <div className="mb-3">
        <Link to="/allschemes" className="btn btn-outline-secondary">
          View All Government Schemes
        </Link>
      </div>

      {schemes.length === 0 ? (
        <p>No schemes found.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Eligibility</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schemes.map((scheme) => (
              <tr key={scheme.schemeid}>
                <td>{scheme.schemename}</td>
                <td>{scheme.description}</td>
                <td>{scheme.eligibility}</td>
                <td>{new Date(scheme.startdate).toLocaleDateString()}</td>
                <td>{new Date(scheme.lastdate).toLocaleDateString()}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => navigate(`/editscheme/${scheme.schemeid}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(scheme.schemeid)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        onClick={() => navigate('/government/dashboard')}
        className="btn btn-secondary mt-4"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default ViewScheme;
