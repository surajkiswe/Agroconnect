import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'farmer' });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', formData);
    // TODO: send data to backend and redirect based on role
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '400px' }}>
      <h3 className="mb-4 text-center">Login</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select Role</Form.Label>
          <Form.Select name="role" onChange={handleChange}>
            <option value="farmer">Farmer</option>
            <option value="vendor">Vendor</option>
            <option value="government">Government</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">Login</Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
