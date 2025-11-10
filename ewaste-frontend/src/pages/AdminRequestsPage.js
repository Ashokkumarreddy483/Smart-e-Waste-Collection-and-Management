import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminRequestsPage.css"; // external CSS file

const AdminRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin/requests");
      setRequests(response.data);
      setFilteredRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const handleAction = async (id, action) => {
    try {
      if (action === "delete") {
        await axios.delete(`http://localhost:8080/api/admin/requests/${id}`);
      } else {
        await axios.put(`http://localhost:8080/api/admin/requests/${id}/${action}`);
      }
      fetchRequests();
    } catch (error) {
      console.error(`Error performing ${action} action:`, error);
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);

    if (value === "All") {
      setFilteredRequests(requests);
    } else {
      const filtered = requests.filter((r) => r.status === value);
      setFilteredRequests(filtered);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2 className="admin-title">📦 Pickup Requests</h2>

        <select
          value={filter}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User Email</th>
            <th>Device</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Condition</th>
            <th>Qty</th>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.userEmail}</td>
                <td>{req.deviceType}</td>
                <td>{req.brand}</td>
                <td>{req.model}</td>
                <td>{req.conditionStatus}</td>
                <td>{req.quantity}</td>
                <td>{req.pickupAddress}</td>
                <td>
                  <span className={`status ${req.status.toLowerCase()}`}>
                    {req.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn approve"
                    onClick={() => handleAction(req.id, "approve")}
                  >
                    ✅ Approve
                  </button>
                  <button
                    className="btn reject"
                    onClick={() => handleAction(req.id, "reject")}
                  >
                    ❌ Reject
                  </button>
                  <button
                    className="btn delete"
                    onClick={() => handleAction(req.id, "delete")}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="no-data">
                No pickup requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRequestsPage;
