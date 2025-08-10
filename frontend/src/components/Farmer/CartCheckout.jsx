import React, { useState, useEffect } from "react";
import axios from "axios";

function CartCheckout({ cartItems, userId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Assuming you get total price from cart items
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // You may want to gather extra info for payment like transaction id
  const [transactionId, setTransactionId] = useState("");

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Construct order data - change keys as per your backend
      const orderPayload = {
        userId, // or order user id, if needed
        items: cartItems.map((item) => ({
          productId: item.id, // your product id field
          quantity: item.quantity,
          price: item.price,
          // Add vendor id (vid) here if your backend requires it
          vid: item.vid || null, // Make sure your cart items have vid if needed
        })),
      };

      // 1) Create order + order details
      const orderResponse = await axios.post("/api/orders", orderPayload);

      const orderId = orderResponse.data.id; // get created order id

      // 2) Create payment for that order
      const paymentPayload = {
        amount: totalPrice,
        orderid: orderId,
        payment_date: new Date().toISOString().slice(0, 10),
        transaction_id: transactionId,
      };

      await axios.post("/api/payment", paymentPayload);

      setSuccess("Checkout successful!");
    } catch (err) {
      setError("Checkout failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Cart Checkout</h2>
      <p>Total: ₹{totalPrice.toFixed(2)}</p>

      <div>
        <label>Transaction ID:</label>
        <input
          type="text"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          placeholder="Enter payment transaction id"
          required
        />
      </div>

      <button onClick={handleCheckout} disabled={loading || !transactionId}>
        {loading ? "Processing..." : "Checkout"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

export default CartCheckout;
