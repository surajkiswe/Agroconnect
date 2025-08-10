import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Table, Container, Button, Card, Form, Alert } from 'react-bootstrap';

const categoryOptions = [
  { cid: 1, cname: 'Seeds' },
  { cid: 2, cname: 'Fertilizers' },
  { cid: 3, cname: 'Farming Tools' }
];

const AddVendorProductsByCategory = () => {
  const auth = useSelector((state) => state.auth);
  const vid = auth?.vid || localStorage.getItem('vid');

  const [selectedCid, setSelectedCid] = useState(1);
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState({});
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (vid) {
      localStorage.setItem('vid', vid);
      fetchProducts(selectedCid);
    }
  }, [selectedCid, vid]);

  const fetchProducts = async (cid) => {
    try {
      const res = await axios.get(`http://localhost:8082/category/getone/${cid}`);
      setProducts(res.data.products || []);
      setPrices({});
      setError('');
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Could not fetch products.');
      setProducts([]);
    }
  };

  const handlePriceChange = (prodid, value) => {
    setPrices((prev) => ({ ...prev, [prodid]: value }));
  };

  const handleAddProduct = async (prodid) => {
    try {
      if (!vid) throw new Error('Vendor ID not found.');

      const price = parseFloat(prices[prodid]);
      if (!price || price <= 0) throw new Error('Please enter a valid price.');

      const payload = { prodid, vid, price };
      await axios.post(`http://localhost:8082/productvendor/add`, payload);

      setSuccessMsg(`Product ${prodid} added successfully.`);
      setError('');
    } catch (err) {
      console.error('Error in handleAddProduct:', err);
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Something went wrong while adding the product.';
      setError(msg);
      setSuccessMsg('');
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow p-4">
        <h3 className="mb-4">Add Products by Category</h3>

        <Form.Select
          className="mb-3"
          value={selectedCid}
          onChange={(e) => setSelectedCid(parseInt(e.target.value))}
        >
          {categoryOptions.map((cat) => (
            <option key={cat.cid} value={cat.cid}>{cat.cname}</option>
          ))}
        </Form.Select>

        {error && <Alert variant="danger">{error}</Alert>}
        {successMsg && <Alert variant="success">{successMsg}</Alert>}

        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Add Price (₹)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.prodid}>
                  <td>{prod.pname}</td>
                  <td>{prod.pdescription}</td>
                  <td>
                    <Form.Control
                      type="number"
                      min="1"
                      placeholder="Enter price"
                      value={prices[prod.prodid] || ''}
                      onChange={(e) => handlePriceChange(prod.prodid, e.target.value)}
                    />
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleAddProduct(prod.prodid)}
                    >
                      Add
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  );
};

export default AddVendorProductsByCategory;
