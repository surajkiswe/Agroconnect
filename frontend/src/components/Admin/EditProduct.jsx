import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams(); // product id from route
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    prodid: '',
    pname: '',
    pdescription: '',
    cid: '',
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load product details
  useEffect(() => {
    axios.get(`http://localhost:8080/api/Admin/getProductById?prodid=${id}`)
      .then((res) => {
        const data = res.data;
        setFormData({
          prodid: data.prodid,
          pname: data.pname,
          pdescription: data.pdescription || '',
          cid: data.cid,
        });
      })
      .catch(() => setError('Failed to load product.'));
  }, [id]);

  // Load categories
  useEffect(() => {
    axios.get('http://localhost:8080/api/Admin/categories')
      .then((res) => {
        if (res.data && Array.isArray(res.data.$values)) {
          setCategories(res.data.$values);
        }
      })
      .catch(() => setError('Failed to load categories.'));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('http://localhost:8080/api/Admin/updateProduct', formData)
      .then(() => {
        setSuccess('Product updated successfully!');
        setTimeout(() => navigate('/admin/allproducts'), 1500); // redirect
      })
      .catch(() => setError('Failed to update product.'));
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>Edit Product</Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="pname"
                value={formData.pname}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="pdescription"
                value={formData.pdescription}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="cid"
                value={formData.cid}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.cid} value={cat.cid}>
                    {cat.cname}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Product
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditProduct;
