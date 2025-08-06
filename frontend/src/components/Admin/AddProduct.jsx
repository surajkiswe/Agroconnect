import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [selectedCid, setSelectedCid] = useState('');
  const [selectedBid, setSelectedBid] = useState('');

  const [productData, setProductData] = useState({
    pname: '',
    pdescription: ''
  });

  const [success, setSuccess] = useState('');

  // Fetch categories
  useEffect(() => {
    axios.get('http://localhost:8084/api/admin/categories')
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data)) {
          setCategories(data);
        } else if (data?.$values && Array.isArray(data.$values)) {
          setCategories(data.$values);
        } else {
          console.error('Invalid category format:', data);
          setCategories([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setCategories([]);
      });
  }, []);

  // Fetch brands when category changes
  useEffect(() => {
    if (selectedCid) {
      axios.get(`http://localhost:8084/api/admin/brands/${selectedCid}`)
        .then((res) => {
          const data = res.data;
          if (Array.isArray(data)) {
            setBrands(data);
          } else if (data?.$values && Array.isArray(data.$values)) {
            setBrands(data.$values);
          } else {
            console.error('Invalid brand format:', data);
            setBrands([]);
          }
        })
        .catch((err) => {
          console.error('Error fetching brands:', err);
          setBrands([]);
        });
    } else {
      setBrands([]);
    }
  }, [selectedCid]);

  // Handle input changes
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setSelectedCid(e.target.value);
    setSelectedBid('');
  };

  const handleBrandChange = (e) => {
    setSelectedBid(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      Pname: productData.pname,
      Pdescription: productData.pdescription,
      Bid: parseInt(selectedBid)
    };

    console.log("Submitting product payload:", payload);

    try {
      await axios.post('http://localhost:8084/api/admin/addProduct', payload);
      setSuccess('✅ Product added successfully!');
      setProductData({ pname: '', pdescription: '' });
      setSelectedCid('');
      setSelectedBid('');
      setBrands([]);
    } catch (err) {
      console.error('Error adding product:', err);
      setSuccess('❌ Failed to add product. Please check your data.');
    }
  };

  return (
    <div className="container mt-4">
      <h4>Select Category:</h4>
      <select
        className="form-select mb-3"
        value={selectedCid}
        onChange={handleCategoryChange}
        required
      >
        <option value="">-- Select Category --</option>
        {categories.map((cat) => (
          <option key={cat.cid} value={cat.cid}>
            {cat.cname}
          </option>
        ))}
      </select>

      {brands.length > 0 && (
        <>
          <h4>Select Brand:</h4>
          <select
            className="form-select mb-3"
            value={selectedBid}
            onChange={handleBrandChange}
            required
          >
            <option value="">-- Select Brand --</option>
            {brands.map((brand) => (
              <option key={brand.bid} value={brand.bid}>
                {brand.bname}
              </option>
            ))}
          </select>
        </>
      )}

      {selectedBid && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Product Name</label>
            <input
              type="text"
              name="pname"
              className="form-control"
              value={productData.pname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Description</label>
            <input
              type="text"
              name="pdescription"
              className="form-control"
              value={productData.pdescription}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Add Product
          </button>
        </form>
      )}

      {success && <div className="alert alert-info mt-3">{success}</div>}
    </div>
  );
};

export default AddProduct;
