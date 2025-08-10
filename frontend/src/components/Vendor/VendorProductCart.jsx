
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Table, Container, Button, Card, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const VendorProductCart = () => {
  const [products, setProducts] = useState([]);
  const [rentalProducts, setRentalProducts] = useState([]);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [productCategories, setProductCategories] = useState({});

  const navigate = useNavigate();
  const vidFromRedux = useSelector((state) => state.auth?.vid);
  const vid = vidFromRedux || localStorage.getItem("vid");

  // ✅ Fetch Vendor Products
  const fetchVendorProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:8082/productvendor/getbyvid/${vid}`);
      setProducts(res.data);
      await fetchCategoryNames(res.data, "vendor");
    } catch (err) {
      console.error("Error fetching vendor products:", err);
      setError("Failed to load vendor products.");
    }
  };

  // ✅ Fetch Rental Products
  const fetchRentalProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:8082/productrental/getbyvid/${vid}`);
      setRentalProducts(res.data);
      await fetchCategoryNames(res.data, "rental");
    } catch (err) {
      console.error("Error fetching rental products:", err);
      setError("Failed to load rental products.");
    }
  };

  // ✅ Get Category Name by Product ID
  const getCategoryNameByProdid = async (prodid) => {
    try {
      const res = await axios.get(`http://localhost:8082/product/getbyid/${prodid}`);
      const category = res.data?.bid?.cid;
      return category?.cname || "Unknown";
    } catch (error) {
      console.error("Error fetching category:", error);
      return "Unknown";
    }
  };

  // ✅ Build Category Map
  const fetchCategoryNames = async (productsList, type) => {
    const categoryMap = { ...productCategories };
    for (let item of productsList) {
      const prodid = item?.prodid?.prodid || item?.prodid;
      if (!categoryMap[prodid]) {
        const cname = await getCategoryNameByProdid(prodid);
        categoryMap[prodid] = cname;
      }
    }
    setProductCategories(categoryMap);
  };

  useEffect(() => {
    if (!vid) {
      setError('Vendor ID not found. Please login again.');
      return;
    }
    localStorage.setItem("vid", vid);
    fetchVendorProducts();
    fetchRentalProducts();
  }, [vid]);

  // ✅ Edit Handler
  const handleEdit = async (type, id) => {
    try {
      if (type === "vendor") {
        const res = await axios.get(`http://localhost:8082/productvendor/getbypvid/${id}`);
        setEditPrice(res.data.price);
      } else {
        const res = await axios.get(`http://localhost:8082/productrental/getone/${id}`);
        setEditPrice(res.data.rateperday);
      }
      setEditingId({ id, type });
    } catch (err) {
      console.error("Failed to fetch product details:", err);
      setError("Failed to fetch product details.");
    }
  };

  // ✅ Update Handler
  const handleUpdate = async () => {
    const { id, type } = editingId;
    try {
      const price = parseFloat(editPrice);
      if (!price || price <= 0) {
        setError("Enter a valid price.");
        return;
      }

      if (type === "vendor") {
        await axios.put(`http://localhost:8082/productvendor/updateprice?pvid=${id}&price=${price}`);
        fetchVendorProducts();
      } else {
        await axios.put(`http://localhost:8082/productrental/update?prorid=${id}&rateperday=${price}`);
        fetchRentalProducts();
      }

      setEditingId(null);
      setEditPrice('');
    } catch (err) {
      console.error("Failed to update price:", err);
      setError("Failed to update price.");
    }
  };

  // ✅ Delete Handler
  const handleDelete = async (type, id) => {
    try {
      if (type === "vendor") {
        await axios.delete(`http://localhost:8082/productvendor/delete/${id}`);
        fetchVendorProducts();
      } else {
        await axios.delete(`http://localhost:8082/productrental/delete/${id}`);
        fetchRentalProducts();
      }
    } catch (err) {
      console.error("Failed to delete product:", err);
      setError("Failed to delete product.");
    }
  };

  // ✅ Render Table
  const renderTable = (data, type) => (
    <Table striped bordered hover responsive className="mt-4">
      <thead className="table-dark">
        <tr>
          <th>Product Name</th>
          <th>Description</th>
          <th>Category</th>
          <th>{type === "vendor" ? "Price (₹)" : "Rate/Day (₹)"}</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          const id = type === "vendor" ? item.pvid : item.prorid;
          const prodid = item?.prodid?.prodid || item?.prodid;
          return (
            <tr key={id}>
              <td>{item.prodid?.pname || item.pname}</td>
              <td>{item.prodid?.pdescription || item.pdescription}</td>
              <td>{productCategories[prodid] || "Loading..."}</td>
              <td>
                {editingId?.id === id && editingId?.type === type ? (
                  <Form.Control
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    min="1"
                  />
                ) : (
                  type === "vendor" ? item.price?.toFixed(2) : item.rateperday?.toFixed(2)
                )}
              </td>
              <td>
                {editingId?.id === id && editingId?.type === type ? (
                  <Button size="sm" variant="success" onClick={handleUpdate}>
                    Update
                  </Button>
                ) : (
                  <>
                    <Button size="sm" variant="warning" className="me-2" onClick={() => handleEdit(type, id)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => handleDelete(type, id)}>
                      Delete
                    </Button>
                  </>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );

  return (
    <Container className="mt-4">
      <Card className="shadow p-4">
        <h3 className="mb-4">My Products</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <h5>Sale Products</h5>
        {products.length === 0 ? <p>No sale products found.</p> : renderTable(products, "vendor")}

        <h5 className="mt-5">Rental Products</h5>
        {rentalProducts.length === 0 ? <p>No rental products found.</p> : renderTable(rentalProducts, "rental")}

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

export default VendorProductCart;
