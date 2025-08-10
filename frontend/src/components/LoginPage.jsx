import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth_url } from './urls';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './slices/authSlice';

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${auth_url}/find`, formData);
      const data = response.data;

      console.log("Login response:", data);

      const userid = data.uid;
      const roleName = data.role?.rolename?.toLowerCase();

      if (!userid || !roleName) {
        setError('Login failed. Invalid server response.');
        return;
      }

      let gid = null;
      let vid = null;
      let fid = null;

      // ✅ Get vendor ID
      if (roleName === 'vendor') {
        try {
          const vendorResponse = await axios.get(`http://localhost:8080/vendor/getbyuid/${userid}`);
          const vendorData = vendorResponse.data[0];

          if (!vendorData || !vendorData.vid) throw new Error("VID not found.");
          vid = vendorData.vid;
          localStorage.setItem("vid", vid);
        } catch (vidErr) {
          console.error("Error fetching VID:", vidErr);
          setError("Login failed while fetching vendor ID.");
          return;
        }
      }

      // ✅ Get government ID
      if (roleName === 'government') {
        try {
          const govResponse = await axios.get(`http://localhost:8080/api/Government/get_by_userid/${userid}`);
          gid = govResponse.data?.gid;

          if (!gid) throw new Error("GID not found.");
          localStorage.setItem("gid", gid);
        } catch (gidErr) {
          console.error("Error fetching GID:", gidErr);
          setError("Login failed while fetching government ID.");
          return;
        }
      }

      if (roleName === 'farmer') {
        try {
          const farmerResponse = await axios.get(`http://localhost:8080/farmer/getbyuid/${userid}`);
          console.log("Farmer response data:", farmerResponse.data);

          const farmerData = farmerResponse.data[0];
          if (!farmerData || !farmerData.fid) throw new Error("FID not found.");

          fid = farmerData.fid;
          console.log(fid);
          localStorage.setItem("fid", fid);
        } catch (fidErr) {
          console.error("Error fetching FID:", fidErr);
          setError("Login failed while fetching farmer ID.");
          return;
        }
      }

      // ✅ Save in Redux
      dispatch(
        loginSuccess({
          fname: data.fname,
          lname: data.lname,
          userid,
          username: data.username,
          role: data.role.rolename,
          gid,
          vid,
          fid
        })
      );

      // ✅ Navigate based on role
      switch (roleName) {
        case 'farmer':
          navigate('/farmer/dashboard');
          break;
        case 'vendor':
          navigate('/vendor/dashboard');
          break;
        case 'government':
          navigate('/government/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        default:
          setError('Invalid role. Access denied.');
          return;
      }

      setFormData({ username: '', password: '' });

    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please check your username and password.');
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '400px' }}>
      <h3 className="mb-4 text-center">Login</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Enter your username"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
