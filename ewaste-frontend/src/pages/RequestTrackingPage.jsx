import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RequestTrackingPage.css";
import { FaClock, FaCheckCircle, FaTruck, FaTimesCircle } from "react-icons/fa";

const RequestTrackingPage = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user?.email) return;
      try {
        const res = await axios.get(
          `http://localhost:8080/api/pickups/user/${user.email}`
        );
        setRequests(res.data);
      } catch (err) {
        console.error("Error fetching pickup orders:", err);
      }
    };
    fetchRequests();
  }, [user]);

  const getStatusIndex = (status) => {
    switch (status) {
      case "Pending":
        return 0;
      case "Approved":
        return 1;
      case "Scheduled":
        return 2;
      case "Completed":
        return 3;
      default:
        return -1;
    }
  };

  const statusSteps = ["Pending", "Approved", "Scheduled", "Completed"];

  // ✅ Format and handle null dates safely
  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    const date = new Date(dateString);
    if (isNaN(date)) return "Not available";
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ✅ Add 7 days for expected pickup date
  const getExpectedPickupDate = (dateString) => {
    if (!dateString) return "Not available";
    const date = new Date(dateString);
    if (isNaN(date)) return "Not available";
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const filtered = requests.filter((req) => {
    if (filter !== "All" && req.status !== filter) return false;
    if (
      search &&
      !req.deviceType.toLowerCase().includes(search.toLowerCase()) &&
      !req.pickupAddress.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="tracking-container">
      <h2 className="tracking-title">📦 Your Pickup Orders</h2>
      <p className="tracking-subtitle">
        Track your e-waste recycling journey like Amazon orders 📦
      </p>

      {/* 🔍 Filters */}
      <div className="filter-search-bar">
        <select
          className="filter-dropdown"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Rejected">Rejected</option>
        </select>

        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search by device or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 🧾 Orders */}
      {filtered.length === 0 ? (
        <div className="no-orders">
          <p>🚫 No pickup orders found.</p>
          <a href="/schedule" className="schedule-link">
            Schedule a new pickup →
          </a>
        </div>
      ) : (
        <div className="tracking-list">
          {filtered.map((req) => {
            const statusIndex = getStatusIndex(req.status);
            return (
              <div className="tracking-card" key={req.id}>
                <div className="tracking-header">
                  <h3>Request #{req.id}</h3>
                  <span className={`status-badge ${req.status.toLowerCase()}`}>
                    {req.status}
                  </span>
                </div>

                <div className="tracking-info">
                  <p><strong>Device:</strong> {req.deviceType}</p>
                  <p><strong>Brand:</strong> {req.brand}</p>
                  <p><strong>Model:</strong> {req.model}</p>
                  <p><strong>Condition:</strong> {req.conditionStatus}</p>
                  <p><strong>Quantity:</strong> {req.quantity}</p>
                  <p><strong>Pickup Address:</strong> {req.pickupAddress}</p>
                  <p><strong>Requested On:</strong> {formatDate(req.createdAt)}</p>
                  <p><strong>Expected Pickup:</strong> {getExpectedPickupDate(req.createdAt)}</p>
                </div>

                {/* 🚚 Progress Bar */}
                <div className="progress-container">
                  {statusSteps.map((step, i) => (
                    <div key={i} className="step">
                      <div
                        className={`circle ${i <= statusIndex ? "active" : ""}`}
                      >
                        {i < statusIndex ? (
                          <FaCheckCircle />
                        ) : i === statusIndex ? (
                          <FaTruck />
                        ) : (
                          <FaClock />
                        )}
                      </div>
                      <p className="step-label">{step}</p>
                      {i < statusSteps.length - 1 && (
                        <div
                          className={`line ${
                            i < statusIndex ? "active-line" : ""
                          }`}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* ❌ Rejection Reason */}
                {req.status === "Rejected" && req.remarks && (
                  <p className="rejection-reason">
                    <FaTimesCircle /> <strong>Reason:</strong> {req.remarks}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RequestTrackingPage;
