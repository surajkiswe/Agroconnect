import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function PaymentForm() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const fid = localStorage.getItem("fid");

  const [paymentMethod, setPaymentMethod] = useState("CASH_ON_DELIVERY"); // default method
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10)); // YYYY-MM-DD
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [totalamount, setTotalamount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchOrderAmount() {
      try {
        const res = await axios.get(`http://localhost:8080/farmer/order/${orderId}`);
        setTotalamount(res.data.totalamount ?? 0);
      } catch (err) {
        setError("Failed to load order details.");
      }
    }
    if (orderId) fetchOrderAmount();
  }, [orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const payload = {
      amount: totalamount,
      orderid: orderId,
      payment_date: paymentDate,
      method: paymentMethod,
      paymentstatus: "Completed",
    };

    try {
      await axios.post("http://localhost:8080/farmer/payment", payload);

      // Clear the cart after payment success
      await axios.delete(`http://localhost:8080/farmer/cart/clear/${fid}`);

      alert("Payment successful!");

      setSuccess("Payment successful! Redirecting to dashboard...");
      navigate("/farmer/dashboard");
    } catch (err) {
      setError("Payment failed: " + (err.response?.data?.message || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", padding: "30px", borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
      <h3 className="mb-4 text-center" style={{ color: "#2c662d" }}>Make Payment</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-bold">Order ID</label>
          <input type="text" className="form-control" value={orderId} readOnly />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Amount</label>
          <input
            type="text"
            className="form-control"
            value={totalamount !== null ? `₹${totalamount.toFixed(2)}` : "Loading..."}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label htmlFor="paymentDate" className="form-label fw-bold">Payment Date</label>
          <input
            type="date"
            id="paymentDate"
            className="form-control"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="paymentMethod" className="form-label fw-bold">Payment Method</label>
          <select
            id="paymentMethod"
            className="form-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="CASH_ON_DELIVERY">Cash On Delivery</option>
            <option value="CREDIT_CARD">Credit Card</option>
            <option value="DEBIT_CARD">Debit Card</option>
            <option value="NET_BANKING">Net Banking</option>
            <option value="UPI">UPI</option>
          </select>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success" role="alert">
            {success}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={totalamount === 0 || isSubmitting}
          style={{ fontWeight: "bold" }}
        >
          {isSubmitting ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}

export default PaymentForm;
