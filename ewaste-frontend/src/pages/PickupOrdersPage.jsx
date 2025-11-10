import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PickupOrdersPage.css";

const PickupOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch all pickup orders from backend
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:8080/api/pickup-orders/all");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching pickup orders:", err);
      setError("Failed to load pickup orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Format date safely
  const formatDate = (dateTime) => {
    if (!dateTime) return "Not Scheduled";
    const date = new Date(dateTime);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="pickup-container">
      <div className="pickup-header">
        <h2 className="pickup-title">📋 All Pickup Orders</h2>
        <p className="pickup-subtitle">
          View and manage all e-waste pickup requests.
        </p>
        <button className="refresh-btn" onClick={fetchOrders}>
          🔄 Refresh
        </button>
      </div>

      {loading ? (
        <p className="loading-text">Loading pickup orders...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : orders.length === 0 ? (
        <p className="no-orders">No pickup orders found.</p>
      ) : (
        <div className="table-container">
          <table className="pickup-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Pickup Address</th>
                <th>Additional Notes</th>
                <th>Status</th>
                <th>Rejection Reason</th>
                <th>Scheduled Date/Time</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.fullName}</td>
                  <td>{order.email}</td>
                  <td>{order.phoneNumber}</td>
                  <td>{order.pickupAddress}</td>
                  <td>{order.additionalNotes || "—"}</td>
                  <td>
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.rejectionReason || "—"}</td>
                  <td>{formatDate(order.scheduledDateTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PickupOrdersPage;
