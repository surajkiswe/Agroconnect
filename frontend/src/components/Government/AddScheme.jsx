// import React, { useState } from 'react';
// import axios from 'axios';
// import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
// import { useSelector } from 'react-redux';


// function AddScheme() {
//   const [formData, setFormData] = useState({
//     schemeName: '',
//     description: '',
//     eligibility: '',
//     startDate: '',
//     endDate: '',
//   });

//   const [success, setSuccess] = useState('');
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setSuccess('');
//   setError('');

//   const schemeData = {
//     schemename: formData.schemeName,
//     description: formData.description,
//     eligibility: formData.eligibility,
//     startdate: formData.startDate,     
//     lastdate: formData.endDate, 
//     gid: 5                             
//   };

//   try {
//     const response = await axios.post('http://localhost:8083/api/government/add_scheme', schemeData);
//     if (response.status === 200) {
//       setSuccess('Scheme added successfully!');
//       setFormData({ schemeName: '', description: '', eligibility: '', startDate: '', endDate: '' });
//     }
//   } catch (err) {
//     console.error("Server error:", err);
//     setError('Failed to add scheme. Please check data and try again.');
//   }
// };


//   return (
//     <Container className="mt-4">
//       <Card className="shadow p-4">
//         <h3 className="mb-3">Add New Scheme</h3>

//         {success && <Alert variant="success">{success}</Alert>}
//         {error && <Alert variant="danger">{error}</Alert>}

//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3" controlId="schemeName">
//             <Form.Label>Scheme Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="schemeName"
//               value={formData.schemeName}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="description">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="eligibility">
//             <Form.Label>Eligibility Criteria</Form.Label>
//             <Form.Control
//               type="text"
//               name="eligibility"
//               value={formData.eligibility}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="startDate">
//             <Form.Label>Start Date</Form.Label>
//             <Form.Control
//               type="date"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="endDate">
//             <Form.Label>End Date</Form.Label>
//             <Form.Control
//               type="date"
//               name="endDate"
//               value={formData.endDate}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Button type="submit" variant="primary">Submit</Button>
//         </Form>
//       </Card>
//     </Container>
//   );
// }

// export default AddScheme;


import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function AddScheme() {
  const [formData, setFormData] = useState({
    schemeName: '',
    description: '',
    eligibility: '',
    startDate: '',
    endDate: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  //  Get gid from Redux store
  const gid = useSelector((state) => state.auth.gid);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    //  Ensure gid is available
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

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="schemeName">
            <Form.Label>Scheme Name</Form.Label>
            <Form.Control
              type="text"
              name="schemeName"
              value={formData.schemeName}
              onChange={handleChange}
              required
            />
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
          </Form.Group>

          <Form.Group className="mb-3" controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary">Submit</Button>
        </Form>
      </Card>
    </Container>
  );
}

export default AddScheme;
