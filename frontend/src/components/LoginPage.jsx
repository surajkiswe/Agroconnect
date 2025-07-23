import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';

const Login = () => {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!role) {
      setError('Please select a role');
      return;
    }

    try {
      const res = await axios.post(`http://localhost:8080/api/${role}/login`, {
        username,
        password
      });

      const token = res.data.token;
      localStorage.setItem('token', token);

      // Redirect to respective dashboard
      window.location.href = `/${role}/dashboard`;
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card style={{ width: '400px', padding: '20px' }}>
        <h3 className="text-center mb-4">User Login</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="role">
            <Form.Label>Select Role</Form.Label>
            <Form.Select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="">-- Select --</option>
              <option value="farmer">Farmer</option>
              <option value="vendor">Vendor</option>
              <option value="government">Government</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
