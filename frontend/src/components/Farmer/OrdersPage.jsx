import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Spinner, Alert } from "react-bootstrap";

const OrdersPage = () => {
  const [ordersWithPayments, setOrdersWithPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fid = localStorage.getItem("fid");

  useEffect(() => {
    const fetchOrdersWithPayments = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`http://localhost:8080/farmer/order/farmer/${fid}/withpayments`);
        setOrdersWithPayments(res.data);
      } catch (err) {
        setError("Failed to load orders with payments.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (fid) fetchOrdersWithPayments();
  }, [fid]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center" style={{ color: "#2c662d" }}>
        Your Orders & Payments
      </h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && ordersWithPayments.length === 0 && (
        <Alert variant="info" className="text-center">
          You have no orders yet.
        </Alert>
      )}

      {!loading && !error && ordersWithPayments.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr style={{ backgroundColor: "#d8ffd8" }}>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Total Amount (₹)</th>
              <th>Shipping Address</th>
              <th>Payments</th>
            </tr>
          </thead>
          <tbody>
            {ordersWithPayments.map(({ order, payments }) => (
              <tr key={order.orderid}>
                <td>{order.orderid}</td>
                <td>{new Date(order.orderdate).toLocaleDateString()}</td>
                <td>{order.totalamount?.toFixed(2)}</td>
                <td>{order.shippingaddress || "N/A"}</td>
                <td>
                  {payments.length === 0 ? (
                    <span>No payments</span>
                  ) : (
                    <ul>
                      {payments.map((payment) => (
                        <li key={payment.paymentid}>
                          <strong>Method:</strong> {payment.method} |{" "}
                          <strong>Status:</strong> {payment.paymentstatus} |{" "}
                          <strong>Amount:</strong> ₹{payment.amount.toFixed(2)} |{" "}
                          <strong>Date:</strong>{" "}
                          {new Date(payment.paymentDate).toLocaleDateString()}
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default OrdersPage;
