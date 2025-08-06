import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';

const EditScheme = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    schemeid: '',
    schemename: '',
    description: '',
    eligibility: '',
    startdate: '',
    lastdate: ''
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const fetchScheme = async () => {
      try {
        const res = await axios.get(`http://localhost:8083/api/government/getSchemeById/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error('Error fetching scheme:', err);
        setError('Failed to load scheme.');
      }
    };

    fetchScheme();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');
  setValidated(true);

  const { schemename, description, eligibility, startdate, lastdate } = formData;

  const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

  if (
    schemename.trim().length < 3 ||
    description.trim() === '' ||
    eligibility.trim() === '' ||
    startdate === '' ||
    lastdate === '' ||
    new Date(lastdate) < new Date(startdate) ||
    startdate <= today
  ) {
    setError('Please fill all fields correctly. Ensure Start Date is after today and End Date is not before Start Date.');
    return;
  }

  try {
    const res = await axios.put(`http://localhost:8083/api/government/updateScheme/${id}`, formData);
    if (res.status === 200) {
      setSuccess('Scheme updated successfully!');
      setTimeout(() => navigate('/viewschemes'), 1500);
    }
  } catch (err) {
    console.error('Error updating scheme:', err);
    setError('Failed to update scheme.');
  }
};

  return (
    <Container className="mt-4">
      <Card className="shadow p-4">
        <h3 className="mb-3">Edit Scheme</h3>

        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="schemeid">
            <Form.Label>Scheme ID</Form.Label>
            <Form.Control type="text" value={formData.schemeid} readOnly />
          </Form.Group>

          <Form.Group className="mb-3" controlId="schemename">
            <Form.Label>Scheme Name</Form.Label>
            <Form.Control
              type="text"
              name="schemename"
              value={formData.schemename}
              onChange={handleChange}
              required
              minLength={3}
            />
            <Form.Control.Feedback type="invalid">Minimum 3 characters required.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">Description is required.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="eligibility">
            <Form.Label>Eligibility Criteria</Form.Label>
            <Form.Control
              type="text"
              name="eligibility"
              value={formData.eligibility}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">Eligibility is required.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="startdate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startdate"
              value={formData.startdate}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">Start Date is required.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="lastdate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="lastdate"
              value={formData.lastdate}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">End Date is required and should not be before Start Date.</Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary">Update Scheme</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default EditScheme;
