



import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { auth_url } from './urls'; // Adjust the path if needed

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = 'Username is required.';
    } else if (formData.username.length < 6) {
      errors.username = 'Username must be at least 6 characters.';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required.';
    } else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/.test(formData.password)) {
      errors.password = 'Password must be at least 6 characters with 1 digit and 1 special character.';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(auth_url + '/find', formData);
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
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">Login</Button>
      </Form>
    </Container>
  );
};

export default LoginPage;

// import React, { useState } from 'react';
// import { Container, Form, Button, Alert } from 'react-bootstrap';
// import axios from 'axios';
// import { auth_url } from './urls'; // Adjust the import path as necessary

// const LoginPage = () => {
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');

//     try {
//       const response = await axios.post(auth_url+'/find', formData); // Update with your backend API
//       console.log('Login Successful:', response.data);
//       setSuccess('Login successful!');
//       setFormData({ username: '', password: '' });
//     } catch (err) {
//       console.error('Login failed:', err);
//       setError('Login failed. Please check your username and password.');
//     }
//   };

//   return (
//     <Container className="mt-4" style={{ maxWidth: '400px' }}>
//       <h3 className="mb-4 text-center">Login</h3>
//       {error && <Alert variant="danger">{error}</Alert>}
//       {success && <Alert variant="success">{success}</Alert>}
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3">
//           <Form.Label>Username</Form.Label>
//           <Form.Control type="text" name="username" onChange={handleChange} required />
//         </Form.Group>

//         <Form.Group className="mb-3">
//           <Form.Label>Password</Form.Label>
//           <Form.Control type="password" name="password" onChange={handleChange} required />
//         </Form.Group>

//         <Button type="submit" variant="primary" className="w-100">Login</Button>
//       </Form>
//     </Container>
//   );
// };

// export default LoginPage;
