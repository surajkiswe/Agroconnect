import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Button, Card, Form, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddVendorProductsByCategory = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCid, setSelectedCid] = useState('');
  const [selectedBid, setSelectedBid] = useState('');
  const [prices, setPrices] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState('');
  const [backendAddedProducts, setBackendAddedProducts] = useState([]);

  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const vid = auth?.vid || localStorage.getItem("vid");

  // Fetch categories on mount
  useEffect(() => {
    axios.get(`http://localhost:8082/category/getall`)
      .then(res => setCategories(res.data))
      .catch(err => {
        console.error("Error fetching categories", err);
        setError("Failed to load categories");
      });
  }, []);

  // Fetch brands when category changes
  useEffect(() => {
    if (selectedCid) {
      axios.get(`http://localhost:8082/brands/getbycid/${selectedCid}`)
        .then(res => setBrands(res.data))
        .catch(err => {
          console.error("Error fetching brands", err);
          setError("Failed to load brands");
        });
    } else {
      setBrands([]);
    }
    setSelectedBid('');
    setProducts([]);
  }, [selectedCid]);

  // Fetch products when brand changes
  useEffect(() => {
    if (selectedBid) {
      axios.get(`http://localhost:8082/product/getallbybid/${selectedBid}`)
        .then(res => setProducts(res.data))
        .catch(err => {
          console.error("Error fetching products", err);
          setError("Failed to load products");
        });
    } else {
      setProducts([]);
    }
    setPrices({});
    fetchAddedProducts();
  }, [selectedBid]);

  const fetchAddedProducts = async () => {
    try {
      const [vendorRes, rentalRes] = await Promise.all([
        axios.get(`http://localhost:8082/productvendor/getbyvid/${vid}`),
        axios.get(`http://localhost:8082/productrental/getbyvid/${vid}`)
      ]);

      const vendorProdIds = vendorRes.data.map((item) => item.prodid?.prodid || item.prodid);
      const rentalProdIds = rentalRes.data.map((item) => item.prodid?.prodid || item.prodid);

      const allAdded = [...vendorProdIds, ...rentalProdIds];
      setBackendAddedProducts(allAdded);
    } catch (err) {
      console.error("Failed to fetch added product entries:", err);
    }
  };

  const handlePriceChange = (prodid, value) => {
    setPrices((prev) => ({ ...prev, [prodid]: value }));
  };

  const handleAddProduct = async (prodid) => {
    try {
      if (!vid) throw new Error("Vendor ID not found.");

      const price = parseFloat(prices[prodid]);
      if (!price || price <= 0) throw new Error("Please enter a valid price.");

      let payload;
      let endpoint;

      if (parseInt(selectedCid) === 6) {
        payload = { prodid, vid, rateperday: price };
        endpoint = `http://localhost:8082/productrental/add`;
      } else {
        payload = { prodid, vid, price };
        endpoint = `http://localhost:8082/productvendor/add`;
      }

      await axios.post(endpoint, payload);

      // ✅ Locally mark as added without re-fetch
      setBackendAddedProducts((prev) => [...prev, prodid]);

      setSuccessMsg(`Product ${prodid} added successfully.`);
      setError('');
    } catch (err) {
      console.error("Error adding product:", err);
      const msg = err.response?.data?.message || err.message || "Something went wrong.";
      setError(msg);
      setSuccessMsg('');
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow p-4">
        <h3 className="mb-4">Add Product Price by Category</h3>

        {/* Select Category */}
        <Form.Select
          className="mb-3"
          value={selectedCid}
          onChange={(e) => setSelectedCid(e.target.value)}
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat.cid} value={cat.cid}>{cat.cname}</option>
          ))}
        </Form.Select>

        {/* Select Brand */}
        {brands.length > 0 && (
          <Form.Select
            className="mb-4"
            value={selectedBid}
            onChange={(e) => setSelectedBid(e.target.value)}
          >
            <option value="">-- Select Brand --</option>
            {brands.map((brand) => (
              <option key={brand.bid} value={brand.bid}>{brand.bname}</option>
            ))}
          </Form.Select>
        )}

        {error && <Alert variant="danger">{error}</Alert>}
        {successMsg && <Alert variant="success">{successMsg}</Alert>}

        {/* Products Table */}
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>{parseInt(selectedCid) === 6 ? 'Rent/Day (₹)' : 'Price (₹)'}</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td colSpan="4">No products found.</td></tr>
            ) : (
              products.map((prod) => {
                const isAdded = backendAddedProducts.includes(prod.prodid);
                return (
                  <tr key={prod.prodid}>
                    <td>{prod.pname}</td>
                    <td>{prod.pdescription}</td>
                    <td>
                      <Form.Control
                        type="number"
                        placeholder={parseInt(selectedCid) === 6 ? "₹ Rent/Day" : "₹ Price"}
                        min="1"
                        value={prices[prod.prodid] || ''}
                        onChange={(e) => handlePriceChange(prod.prodid, e.target.value)}
                        disabled={isAdded}
                      />
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleAddProduct(prod.prodid)}
                        disabled={isAdded}
                      >
                        {isAdded ? 'Added' : 'Add'}
                      </Button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>

        {/* Back to Dashboard */}
        <Button
          variant="secondary"
          className="mt-3"
          onClick={() => navigate('/vendor/dashboard')}
        >
          ← Back to Dashboard
        </Button>
      </Card>
    </Container>
  );
};

export default AddVendorProductsByCategory;


