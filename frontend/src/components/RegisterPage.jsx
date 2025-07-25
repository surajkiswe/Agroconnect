import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    username: '',
    password: '',
    mobileno: '',
    role: 'Farmer',
    landsize: '',
    income: '',
    locname: '',
    liscenceno: '',
    companyname: '',
    deptname: '',
    designation: '',
    empno: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const roleMap = {
    Farmer: 1,
    Vendor: 2,
    Government: 3
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const roleId = roleMap[formData.role];

    try {
      // Step 1: Register user in User microservice
      const userPayload = {
        fname: formData.fname,
        lname: formData.lname,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        mobileno: formData.mobileno,
        rid: roleId,
        status: 1
      };

      const userResponse = await axios.post('http://localhost:8080/user/register', userPayload);
      const registeredUser = userResponse.data;

      // Step 2: Register role-specific data
      if (formData.role === 'Farmer') {
        const farmerPayload = {
          uid: registeredUser.uid,
          landsize: formData.landsize,
          income: formData.income,
          locname: formData.locname
        };
        await axios.post('http://localhost:8081/farmer/register', farmerPayload);

      } else if (formData.role === 'Vendor') {
        const vendorPayload = {
          uid: registeredUser.uid,
          liscenceno: formData.liscenceno,
          companyname: formData.companyname
        };
        await axios.post('http://localhost:8082/vendor/register', vendorPayload);
      }

      setSuccessMessage('Registered successfully!');
      setErrorMessage('');
      setFormData({
        fname: '',
        lname: '',
        email: '',
        username: '',
        password: '',
        mobileno: '',
        role: 'Farmer',
        landsize: '',
        income: '',
        locname: '',
        liscenceno: '',
        companyname: '',
        deptname: '',
        designation: '',
        empno: ''
      });

    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage('Registration failed. Please check backend or network.');
      setSuccessMessage('');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100 justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow">
            <Card.Body>
              <h3 className="mb-4 text-center">Register to AgroConnect</h3>

              {successMessage && <Alert variant="success">{successMessage}</Alert>}
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="fname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="fname" value={formData.fname} onChange={handleChange} required />
                  </Form.Group>
                  <Form.Group as={Col} controlId="lname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lname" value={formData.lname} onChange={handleChange} required />
                  </Form.Group>
                </Row>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                </Form.Group>

                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                </Form.Group>

                <Form.Group controlId="mobileno" className="mb-3">
                  <Form.Label>Mobile No</Form.Label>
                  <Form.Control type="text" name="mobileno" value={formData.mobileno} onChange={handleChange} required />
                </Form.Group>

                <Form.Group controlId="role" className="mb-4">
                  <Form.Label>Role</Form.Label>
                  <Form.Select name="role" value={formData.role} onChange={handleChange}>
                    <option value="Farmer">Farmer</option>
                    <option value="Vendor">Vendor</option>
                    <option value="Government" disabled>Government</option> {/* Placeholder */}
                  </Form.Select>
                </Form.Group>

                {/* Farmer-specific fields */}
                {formData.role === 'Farmer' && (
                  <>
                    <Form.Group controlId="landsize" className="mb-3">
                      <Form.Label>Land Size (in acres)</Form.Label>
                      <Form.Control type="number" name="landsize" value={formData.landsize} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="income" className="mb-3">
                      <Form.Label>Annual Income</Form.Label>
                      <Form.Control type="number" name="income" value={formData.income} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="locname" className="mb-3">
                      <Form.Label>Location Name</Form.Label>
                      <Form.Control type="text" name="locname" value={formData.locname} onChange={handleChange} required />
                    </Form.Group>
                  </>
                )}

                {/* Vendor-specific fields */}
                {formData.role === 'Vendor' && (
                  <>
                    <Form.Group controlId="liscenceno" className="mb-3">
                      <Form.Label>License Number</Form.Label>
                      <Form.Control type="text" name="liscenceno" value={formData.liscenceno} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="companyname" className="mb-3">
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control type="text" name="companyname" value={formData.companyname} onChange={handleChange} required />
                    </Form.Group>
                  </>
                )}

                <div className="d-grid mt-4">
                  <Button variant="success" type="submit">Register</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
