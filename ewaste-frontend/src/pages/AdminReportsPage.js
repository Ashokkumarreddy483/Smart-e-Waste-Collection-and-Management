import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminReportPage.css";

const AdminReportPage = () => {
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
  });

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin/requests");
      const data = response.data;
      setRequests(data);

      const counts = {
        total: data.length,
        approved: data.filter((r) => r.status === "Approved").length,
        rejected: data.filter((r) => r.status === "Rejected").length,
        pending: data.filter((r) => r.status === "Pending").length,
      };
      setStats(counts);
    } catch (error) {
      console.error("Error fetching report data:", error);
    }
  };

  return (
    <div className="report-container">
      <h2 className="report-title">📊 Admin Report Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card total">
          <h3>Total Requests</h3>
          <p>{stats.total}</p>
        </div>
        <div className="stat-card approved">
          <h3>Approved</h3>
          <p>{stats.approved}</p>
        </div>
        <div className="stat-card pending">
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>
        <div className="stat-card rejected">
          <h3>Rejected</h3>
          <p>{stats.rejected}</p>
        </div>
      </div>

      <div className="report-table-container">
        <h3 className="sub-title">📦 All Pickup Requests</h3>
        <table className="report-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Email</th>
              <th>Device</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Qty</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.userEmail}</td>
                  <td>{req.deviceType}</td>
                  <td>{req.brand}</td>
                  <td>{req.model}</td>
                  <td>{req.quantity}</td>
                  <td>
                    <span className={`status ${req.status.toLowerCase()}`}>
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReportPage;
