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

    //  If role is government, fetch GID from .NET service
    if (roleName === 'government') {
      try {
        const govResponse = await axios.get(`http://localhost:8083/api/government/get_by_userid/${userid}`);
        gid = govResponse.data.gid;
      } catch (gidErr) {
        console.error("Error fetching GID:", gidErr);
        setError("Login failed while fetching government ID.");
        return;
      }
    }

    // 
    dispatch(
      loginSuccess({
        fname: data.fname,
        lname: data.lname,
        userid,
        username: data.username,
        role: data.role.rolename,
        gid: gid, 
      })
    );

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
