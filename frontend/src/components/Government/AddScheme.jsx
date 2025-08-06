import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AddScheme() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    schemeName: '',
    description: '',
    eligibility: '',
    startDate: '',
    endDate: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const gid = useSelector((state) => state.auth.gid);

 const validate = () => {
  const errors = {};
  const today = new Date().toISOString().split("T")[0]; // format: YYYY-MM-DD

  if (formData.schemeName.trim().length < 3)
    errors.schemeName = 'Scheme name must be at least 3 characters long.';

  if (formData.description.trim().length < 10)
    errors.description = 'Description must be at least 10 characters long.';

  if (formData.eligibility.trim().length < 5)
    errors.eligibility = 'Eligibility must be at least 5 characters long.';

  if (!formData.startDate) {
    errors.startDate = 'Start date is required.';
  } else if (formData.startDate <= today) {
    errors.startDate = 'Start date must be greater than today.';
  }

  if (!formData.endDate) {
    errors.endDate = 'End date is required.';
  }

  if (formData.startDate && formData.endDate && formData.startDate > formData.endDate)
    errors.date = 'Start date must be before end date.';

  return errors;
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (!gid) {
      setError('Government ID not found. Please log in again.');
      return;
    }

    const schemeData = {
      schemename: formData.schemeName,
      description: formData.description,
      eligibility: formData.eligibility,
      startdate: formData.startDate,
      lastdate: formData.endDate,
      gid: gid
    };

    try {
      const response = await axios.post('http://localhost:8083/api/government/add_scheme', schemeData);
      if (response.status === 200) {
        setSuccess('Scheme added successfully!');
        setFormData({ schemeName: '', description: '', eligibility: '', startDate: '', endDate: '' });
      }
    } catch (err) {
      console.error("Server error:", err);
      setError('Failed to add scheme. Please check data and try again.');
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow p-4">
        <h3 className="mb-3">Add New Scheme</h3>

        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        {formErrors.date && <Alert variant="warning">{formErrors.date}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="schemeName">
            <Form.Label>Scheme Name</Form.Label>
            <Form.Control
              type="text"
              name="schemeName"
              value={formData.schemeName}
              onChange={handleChange}
              isInvalid={!!formErrors.schemeName}
            />
            <Form.Control.Feedback type="invalid">{formErrors.schemeName}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              isInvalid={!!formErrors.description}
            />
            <Form.Control.Feedback type="invalid">{formErrors.description}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="eligibility">
            <Form.Label>Eligibility Criteria</Form.Label>
            <Form.Control
              type="text"
              name="eligibility"
              value={formData.eligibility}
              onChange={handleChange}
              isInvalid={!!formErrors.eligibility}
            />
            <Form.Control.Feedback type="invalid">{formErrors.eligibility}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              isInvalid={!!formErrors.startDate}
              
            />
            <Form.Control.Feedback type="invalid">{formErrors.startDate}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              isInvalid={!!formErrors.endDate}
              
            />
            <Form.Control.Feedback type="invalid">{formErrors.endDate}</Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="primary">Submit</Button>
        </Form>

        <Button
          variant="link"
          className="mt-3"
          style={{ textDecoration: 'none', fontWeight: 'bold' }}
          onClick={() => navigate('/government/dashboard')}
        >
          ← Back to Dashboard
        </Button>
      </Card>
    </Container>
  );
}

export default AddScheme;
