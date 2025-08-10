import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AddScheme() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    schemename: '',
    description: '',
    eligibility: '',
    income: '',
    landsize: '',
    startdate: '',
    lastdate: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const gid = useSelector((state) => state.auth.gid);

  const validate = () => {
    const errors = {};
    const today = new Date().toISOString().split("T")[0];

    if (formData.schemename.trim().length < 3)
      errors.schemename = 'Scheme name must be at least 3 characters long.';

    if (formData.description.trim().length < 10)
      errors.description = 'Description must be at least 10 characters long.';

    if (formData.eligibility.trim().length < 5)
      errors.eligibility = 'Eligibility must be at least 5 characters long.';

    if (!formData.income || isNaN(formData.income) || Number(formData.income) <= 0)
      errors.income = 'Income must be a positive number.';

    if (!formData.landsize || isNaN(formData.landsize) || Number(formData.landsize) <= 0)
      errors.landsize = 'Land size must be a positive number.';

    if (!formData.startdate) {
      errors.startdate = 'Start date is required.';
    } else if (formData.startdate < today) {
      errors.startdate = 'Start date cannot be in the past.';
    }

    if (!formData.lastdate) {
      errors.lastdate = 'End date is required.';
    }

    if (formData.startdate && formData.lastdate && formData.startdate > formData.lastdate)
      errors.date = 'Start date must be before end date.';

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: undefined }));
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
      schemename: formData.schemename,
      description: formData.description,
      eligibility: formData.eligibility,
      income: formData.income,
      landsize:formData.landsize,
      startdate: formData.startdate,
      lastdate: formData.lastdate,
      gid: gid
    };

    try {
      const response = await axios.post('http://localhost:8080/api/Government/add_scheme', schemeData);
      if (response.status >= 200 && response.status < 300) {
        setSuccess('Scheme added successfully!');
        setFormData({
          schemename: '',
          description: '',
          eligibility: '',
          income: '',
          landsize: '',
          startdate: '',
          lastdate: ''
        });
        setTimeout(() => navigate('/government/dashboard'), 2000);
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
          <Form.Group className="mb-3" controlId="schemename">
            <Form.Label>Scheme Name</Form.Label>
            <Form.Control
              type="text"
              name="schemename"
              value={formData.schemename}
              onChange={handleChange}
              isInvalid={!!formErrors.schemename}
            />
            <Form.Control.Feedback type="invalid">{formErrors.schemename}</Form.Control.Feedback>
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

          <Form.Group className="mb-3" controlId="income">
            <Form.Label>Maximum Eligible Income</Form.Label>
            <Form.Control
              type="number"
              name="income"
              value={formData.income}
              onChange={handleChange}
              isInvalid={!!formErrors.income}
            />
            <Form.Control.Feedback type="invalid">{formErrors.income}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="landsize">
            <Form.Label>Maximum Eligible Land Size</Form.Label>
            <Form.Control
              type="number"
              name="landsize"
              value={formData.landsize}
              onChange={handleChange}
              isInvalid={!!formErrors.landsize}
            />
            <Form.Control.Feedback type="invalid">{formErrors.landsize}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="startdate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startdate"
              value={formData.startdate}
              onChange={handleChange}
              isInvalid={!!formErrors.startdate}
            />
            <Form.Control.Feedback type="invalid">{formErrors.startdate}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="lastdate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="lastdate"
              value={formData.lastdate}
              onChange={handleChange}
              isInvalid={!!formErrors.lastdate}
            />
            <Form.Control.Feedback type="invalid">{formErrors.lastdate}</Form.Control.Feedback>
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
