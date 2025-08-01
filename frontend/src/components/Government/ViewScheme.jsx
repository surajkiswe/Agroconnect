import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ViewSchemes = () => {
  const { gid } = useSelector((state) => state.auth);
  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const res = await axios.get(`http://localhost:8083/api/government/getSchemes/${gid}`);
        setSchemes(res.data);
      } catch (err) {
        console.error('Error fetching schemes:', err);
      }
    };

    if (gid) fetchSchemes();
  }, [gid]);

  return (
    <div style={{ padding: '30px' }}>
      <h2>Available Schemes</h2>
      <div style={{ marginTop: '20px' }}>
        {schemes.length === 0 ? (
          <p>No schemes found.</p>
        ) : (
          <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {schemes.map((scheme) => (
                <tr key={scheme.schemeid}>
                  <td>{scheme.schemename}</td>
                  <td>{scheme.description}</td>
                  <td>{new Date(scheme.startdate).toLocaleDateString()}</td>
                  <td>{new Date(scheme.lastdate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewSchemes;
