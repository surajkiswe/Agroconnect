import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const EditUser = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    uid: '',
    uname: '',
    email: '',
    password: '',
    role: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/api/Admin/getUserById/${uid}`)
      .then(res => setFormData(res.data))
      .catch(err => setError('User not found or error loading user.'));
  }, [uid]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8084/api/admin/updateUser/${uid}`, formData);
      setSuccess("User updated successfully");
      setTimeout(() => navigate('/all-users'), 1000);
    } catch (error) {
      setError("Error updating user");
    }
  };

  return (
    <Container className="mt-4">
      <h3>Edit User</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="uname" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="uname" value={formData.uname} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" name="password" value={formData.password} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="role" className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="farmer">Farmer</option>
            <option value="vendor">Vendor</option>
            <option value="government">Government</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit">Update User</Button>
      </Form>
    </Container>
  );
};

export default EditUser;
