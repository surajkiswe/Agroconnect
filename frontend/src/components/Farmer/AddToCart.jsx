import React, { useState } from 'react';
import axios from 'axios';

const AddToCartForm = () => {
  const [pvid, setPvid] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [durationDays, setDurationDays] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fid = localStorage.getItem('fid'); // farmer id from login
    if (!fid) {
      setMessage('Farmer ID (fid) not found. Please login first.');
      return;
    }

    const payload = {
      added_date: new Date().toISOString(),
      duration_days: durationDays ? Number(durationDays) : null,
      fid: Number(fid),
      prorid: null,
      price: price ? Number(price) : 0,
      pvid: Number(pvid),
      quantity: quantity ? Number(quantity) : 1,
    };

    try {
      const response = await axios.post('http://localhost:8080/farmer/cart/add', payload);
      setMessage('Item added to cart successfully!');
      // Optionally reset form:
      setPvid('');
      setPrice('');
      setQuantity('');
      setDurationDays('');
    } catch (error) {
      console.error('Add to cart error:', error.response?.data || error.message);
      setMessage('Failed to add item to cart.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', marginTop: 40 }}>
      <h3>Add Item to Cart</h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Vendor ID (pvid):</label>
          <input
            type="number"
            value={pvid}
            onChange={(e) => setPvid(e.target.value)}
            required
            min="1"
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
          />
        </div>

        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            min="1"
          />
        </div>

        <div>
          <label>Duration Days (optional):</label>
          <input
            type="number"
            value={durationDays}
            onChange={(e) => setDurationDays(e.target.value)}
            min="1"
          />
        </div>

        <button type="submit">Add to Cart</button>
      </form>
    </div>
  );
};

export default AddToCartForm;
