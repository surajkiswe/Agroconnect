import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllScheme = () => {
  const [schemes, setSchemes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllSchemes = async () => {
      try {
        const res = await axios.get('http://localhost:8083/api/government/getall');
        setSchemes(res.data);
      } catch (error) {
        console.error('Error fetching all schemes:', error);
      }
    };

    fetchAllSchemes();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">All Government Schemes</h2>

      {schemes.length === 0 ? (
        <p>No schemes available.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Eligibility</th>
              <th>Start Date</th>
              <th>End Date</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        className="btn btn-secondary mt-3"
        onClick={() => navigate('/government/dashboard')}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default AllScheme;
