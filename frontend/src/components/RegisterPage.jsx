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
    designation: '', empno: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const roleMap = { Farmer: 1, Vendor: 2, Government: 3 };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errors = {};
    const isOnlyLetters = (text) => /^[A-Za-z]+$/.test(text);
    const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = (pw) => /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(pw);
    const isMobileValid = (mob) => /^\d{10}$/.test(mob);

    if (!formData.fname || !isOnlyLetters(formData.fname)) errors.fname = 'Valid first name is required.';
    if (!formData.lname || !isOnlyLetters(formData.lname)) errors.lname = 'Valid last name is required.';
    if (!formData.email || !isEmailValid(formData.email)) errors.email = 'Valid email is required.';
    if (!formData.username || formData.username.length < 6) errors.username = 'Username must be at least 6 characters.';
    if (!formData.password || !isPasswordValid(formData.password)) errors.password = 'Password must be 6+ characters with 1 digit & 1 special char.';
    if (!formData.mobileno || !isMobileValid(formData.mobileno)) errors.mobileno = 'Mobile number must be 10 digits.';

    if (formData.role === 'Farmer') {
      if (!formData.landsize || formData.landsize <= 0) errors.landsize = 'Land size must be positive.';
      if (!formData.income || formData.income <= 0) errors.income = 'Income must be positive.';
      if (!formData.locname.trim()) errors.locname = 'Location is required.';
    }
    if (formData.role === 'Vendor') {
      if (!formData.liscenceno.trim()) errors.liscenceno = 'License number is required.';
      if (!formData.companyname.trim()) errors.companyname = 'Company name is required.';
    }
    if (formData.role === 'Government') {
      if (!formData.empno.trim()) errors.empno = 'Employee number is required.';
      if (!formData.deptname.trim()) errors.deptname = 'Department name is required.';
      if (!formData.designation.trim()) errors.designation = 'Designation is required.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const roleId = roleMap[formData.role];
    try {
      const userPayload = {
        fname: formData.fname, lname: formData.lname, email: formData.email,
        username: formData.username, password: formData.password, mobileno: formData.mobileno,
        rid: roleId, status: 1
      };

      const userResponse = await axios.post('http://localhost:8080/user/register', userPayload);
      const registeredUser = userResponse.data;

      if (formData.role === 'Farmer') {
        const farmerPayload = {
          uid: registeredUser.uid, landsize: formData.landsize, income: formData.income, locname: formData.locname
        };
        await axios.post('http://localhost:8081/farmer/register', farmerPayload);
      } else if (formData.role === 'Vendor') {
        const vendorPayload = {
          uid: registeredUser.uid, liscenceno: formData.liscenceno, companyname: formData.companyname
        };
        await axios.post('http://localhost:8082/vendor/register', vendorPayload);
      } else if (formData.role === 'Government') {
        const govtPayload = {
          uid: registeredUser.uid, empno: formData.empno, deptname: formData.deptname, designation: formData.designation
        };
        await axios.post('http://localhost:8083/api/Government/register', govtPayload);
      }

      setSuccessMessage('Registered successfully!');
      setErrorMessage('');
      setFormData({
        fname: '', lname: '', email: '', username: '', password: '', mobileno: '', role: 'Farmer',
        landsize: '', income: '', locname: '', liscenceno: '', companyname: '', deptname: '', designation: '', empno: ''
      });
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage('Registration failed. Check backend or network.');
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
                    <Form.Control type="text" name="fname" value={formData.fname} onChange={handleChange} />
                    {errors.fname && <div className="text-danger">{errors.fname}</div>}
                  </Form.Group>
                  <Form.Group as={Col} controlId="lname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lname" value={formData.lname} onChange={handleChange} />
                    {errors.lname && <div className="text-danger">{errors.lname}</div>}
                  </Form.Group>
                </Row>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
                  {errors.email && <div className="text-danger">{errors.email}</div>}
                </Form.Group>

                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} />
                  {errors.username && <div className="text-danger">{errors.username}</div>}
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
                  {errors.password && <div className="text-danger">{errors.password}</div>}
                </Form.Group>

                <Form.Group controlId="mobileno" className="mb-3">
                  <Form.Label>Mobile No</Form.Label>
                  <Form.Control type="text" name="mobileno" value={formData.mobileno} onChange={handleChange} />
                  {errors.mobileno && <div className="text-danger">{errors.mobileno}</div>}
                </Form.Group>

                <Form.Group controlId="role" className="mb-4">
                  <Form.Label>Role</Form.Label>
                  <Form.Select name="role" value={formData.role} onChange={handleChange}>
                    <option value="Farmer">Farmer</option>
                    <option value="Vendor">Vendor</option>
                    <option value="Government">Government</option>
                  </Form.Select>
                </Form.Group>

                {formData.role === 'Farmer' && (
                  <>
                    <Form.Group controlId="landsize" className="mb-3">
                      <Form.Label>Land Size (in acres)</Form.Label>
                      <Form.Control type="number" name="landsize" value={formData.landsize} onChange={handleChange} />
                      {errors.landsize && <div className="text-danger">{errors.landsize}</div>}
                    </Form.Group>
                    <Form.Group controlId="income" className="mb-3">
                      <Form.Label>Annual Income</Form.Label>
                      <Form.Control type="number" name="income" value={formData.income} onChange={handleChange} />
                      {errors.income && <div className="text-danger">{errors.income}</div>}
                    </Form.Group>
                    <Form.Group controlId="locname" className="mb-3">
                      <Form.Label>Location Name</Form.Label>
                      <Form.Control type="text" name="locname" value={formData.locname} onChange={handleChange} />
                      {errors.locname && <div className="text-danger">{errors.locname}</div>}
                    </Form.Group>
                  </>
                )}

                {formData.role === 'Vendor' && (
                  <>
                    <Form.Group controlId="liscenceno" className="mb-3">
                      <Form.Label>License Number</Form.Label>
                      <Form.Control type="text" name="liscenceno" value={formData.liscenceno} onChange={handleChange} />
                      {errors.liscenceno && <div className="text-danger">{errors.liscenceno}</div>}
                    </Form.Group>
                    <Form.Group controlId="companyname" className="mb-3">
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control type="text" name="companyname" value={formData.companyname} onChange={handleChange} />
                      {errors.companyname && <div className="text-danger">{errors.companyname}</div>}
                    </Form.Group>
                  </>
                )}

                {formData.role === 'Government' && (
                  <>
                    <Form.Group controlId="empno" className="mb-3">
                      <Form.Label>Employee Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="empno"
                        value={formData.empno}
                        onChange={handleChange}
                      />
                      {errors.empno && <div className="text-danger">{errors.empno}</div>}
                    </Form.Group>
                    <Form.Group controlId="deptname" className="mb-3">
                      <Form.Label>Department Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="deptname"
                        value={formData.deptname}
                        onChange={handleChange}
                      />
                      {errors.deptname && <div className="text-danger">{errors.deptname}</div>}
                    </Form.Group>
                    <Form.Group controlId="designation" className="mb-3">
                      <Form.Label>Designation</Form.Label>
                      <Form.Control
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                      />
                      {errors.designation && <div className="text-danger">{errors.designation}</div>}
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

