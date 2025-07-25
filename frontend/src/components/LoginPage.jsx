import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { auth_url } from './urls'; // Adjust the import path as necessary

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(auth_url+'/find', formData); // Update with your backend API
      console.log('Login Successful:', response.data);
      setSuccess('Login successful!');
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
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} required />
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">Login</Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
