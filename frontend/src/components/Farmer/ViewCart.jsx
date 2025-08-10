import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ViewCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [locName, setLocName] = useState('');
  const [customAddress, setCustomAddress] = useState('');
  const [addressError, setAddressError] = useState(false); // validation state
  const fid = localStorage.getItem("fid");
  const navigate = useNavigate();

  // Fetch farmer location
  useEffect(() => {
    if (!fid) return;
    axios.get(`http://localhost:8080/farmer/${fid}`)
      .then(res => {
        if (res.data.location && res.data.location.locname) {
          setLocName(res.data.location.locname);
        }
      })
      .catch(err => console.error("Failed to fetch farmer location", err));
  }, [fid]);

  // Fetch cart items
  useEffect(() => {
    fetchCartItems();
  }, [fid]);

  const fetchCartItems = () => {
    setLoading(true);
    axios.get(`http://localhost:8080/farmer/cart/${fid}`)
      .then(async res => {
        const cartData = res.data;
        const detailedItems = await Promise.all(cartData.map(async (item) => {
          if (item.pvid) {
            const pvRes = await axios.get(`http://localhost:8080/farmer/productvendor/${item.pvid}`);
            return { ...item, productDetails: pvRes.data, type: 'vendor' };
          } else if (item.prorid) {
            const prRes = await axios.get(`http://localhost:8080/farmer/productrental/${item.prorid}`);
            return { ...item, productDetails: prRes.data, type: 'rental' };
          } else {
            return { ...item, productDetails: null, type: 'unknown' };
          }
        }));
        setCartItems(detailedItems);
      })
      .catch(err => console.error("Error fetching cart items", err))
      .finally(() => setLoading(false));
  };

  const updateQuantity = (cartid, currentQty, change) => {
    const newQty = currentQty + change;
    if (newQty < 1) return;
    setUpdatingId(cartid);
    axios.put(`http://localhost:8080/farmer/cart/update/${cartid}`, { quantity: newQty })
      .then(() => {
        setCartItems(items => items.map(i => i.cartid === cartid ? { ...i, quantity: newQty } : i));
      })
      .catch(err => alert("Failed to update quantity"))
      .finally(() => setUpdatingId(null));
  };

  const removeItem = (cartid) => {
    if (!window.confirm("Remove this item from cart?")) return;
    setUpdatingId(cartid);
    axios.delete(`http://localhost:8080/farmer/cart/delete/${cartid}`)
      .then(() => {
        setCartItems(items => items.filter(i => i.cartid !== cartid));
      })
      .catch(err => alert("Failed to remove item"))
      .finally(() => setUpdatingId(null));
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    if (!item.productDetails) return sum;
    const pricePerUnit = item.type === 'rental' ? item.productDetails.rateperday : item.productDetails.price;
    const duration = item.type === 'rental' ? (item.durationDays || 1) : 1;
    return sum + (pricePerUnit * item.quantity * duration);
  }, 0);

  const handleCheckout = () => {
    if (!customAddress.trim()) {
      setAddressError(true);
      return;
    }
    setAddressError(false);

    const shippingAddress = customAddress.trim();

    const order = {
      fid: parseInt(fid),
      orderdate: new Date().toISOString().split('T')[0],
      totalamount: totalPrice,
      paymentstatus: "PENDING",
      paymentmethod: "CASH_ON_DELIVERY",
      shippingaddress: shippingAddress,
    };

    const orderDetails = cartItems.map(item => {
      const isVendor = item.type === 'vendor';
      const duration = item.type === 'rental' ? (item.durationDays || 1) : null;
      const pricePerUnit = isVendor ? item.productDetails.price : item.productDetails.rateperday;
      const subtotal = pricePerUnit * item.quantity * (duration || 1);

      return {
        pvid: isVendor ? item.pvid : null,
        prorid: isVendor ? null : item.prorid,
        quantity: item.quantity,
        durationdays: duration,
        priceperunit: pricePerUnit,
        subtotal: subtotal,
        vid: isVendor
          ? (item.productDetails.vendor?.vid || null)
          : (item.productDetails.vendorid || null),
        price: pricePerUnit
      };
    });

    axios.post("http://localhost:8080/farmer/order/create", { order, orderDetails })
      .then(res => {
        const orderId = res.data.orderid;
        alert("Order created successfully!");
        navigate(`/farmer/payment/${orderId}`);
      })
      .catch(err => {
        console.error("Checkout failed", err);
        alert("Failed to proceed to checkout");
      });
  };

  if (loading) return <div className="text-center"><Spinner animation="border" /></div>;
  if (cartItems.length === 0) return <div className="text-center mt-4">Your cart is empty.</div>;

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Your Cart</h2>
      <Row>
        {cartItems.map(item => {
          const pd = item.productDetails;
          if (!pd) return (
            <Col key={item.cartid} xs={12} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>Unknown Product</Card.Title>
                  <Button variant="danger" disabled={updatingId === item.cartid} onClick={() => removeItem(item.cartid)}>Remove</Button>
                </Card.Body>
              </Card>
            </Col>
          );
          return (
            <Col key={item.cartid} xs={12} md={6} lg={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">
                    Brand: {pd.product?.brand?.bname || pd.product?.brand || pd.brand?.bname || pd.brand || "N/A"}
                  </Card.Subtitle>
                  <Card.Title>{pd.product?.pname || pd.productname || "Product"}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Vendor: {pd.vendor?.companyname || pd.vendor?.vendorname || "N/A"}
                  </Card.Subtitle>
                  <Card.Text>Quantity: {item.quantity}</Card.Text>
                  {item.type === 'rental' && <Card.Text>Duration Days: {item.durationDays || 1}</Card.Text>}
                  <Card.Text>
                    Price per unit: ₹{(item.type === 'rental' ? pd.rateperday : pd.price)?.toFixed(2)}
                  </Card.Text>
                  <div className="d-flex gap-2 align-items-center mb-2">
                    <Button size="sm" disabled={updatingId === item.cartid} onClick={() => updateQuantity(item.cartid, item.quantity, -1)}>-</Button>
                    <span>{item.quantity}</span>
                    <Button size="sm" disabled={updatingId === item.cartid} onClick={() => updateQuantity(item.cartid, item.quantity, 1)}>+</Button>
                  </div>
                  <Button variant="danger" disabled={updatingId === item.cartid} onClick={() => removeItem(item.cartid)}>Remove</Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Shipping address input */}
      <div className="mt-4">
        <Form.Group>
          <Form.Label>Shipping Address <span style={{ color: 'red' }}>*</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter shipping address"
            value={customAddress}
            onChange={(e) => setCustomAddress(e.target.value)}
            isInvalid={addressError}
          />
          <Form.Control.Feedback type="invalid">
            Shipping address is required.
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <h4>Total: ₹{totalPrice.toFixed(2)}</h4>
        <Button variant="success" onClick={handleCheckout}>
          Confirm
        </Button>
      </div>
    </Container>
  );
};

export default ViewCart;
