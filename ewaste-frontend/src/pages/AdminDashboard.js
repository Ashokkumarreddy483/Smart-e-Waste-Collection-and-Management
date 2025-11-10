import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({
    totalRequests: 0,
    activeUsers: 0,
    completedPickups: 0,
    pendingRequests: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (!storedAdmin) {
      navigate("/admin/login");
    } else {
      setAdmin(storedAdmin);
      fetchDashboardStats();
    }
  }, [navigate]);

  // ✅ Fetch stats from backend
  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin/dashboard-stats");
      // Expected backend JSON format:
      // {
      //   "totalRequests": 248,
      //   "activeUsers": 120,
      //   "completedPickups": 175,
      //   "pendingRequests": 22
      // }
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  // Dynamic Dashboard Stats (from backend)
  const dashboardStats = [
    { id: 1, title: "Total Requests", value: stats.totalRequests, color: "#007bff" },
    { id: 2, title: "Active Users", value: stats.activeUsers, color: "#28a745" },
    { id: 3, title: "Completed Pickups", value: stats.completedPickups, color: "#ffc107" },
    { id: 4, title: "Pending Requests", value: stats.pendingRequests, color: "#dc3545" },
  ];

  const menuItems = [
    { label: "Dashboard", icon: "🏠", path: "/admin/dashboard" },
    { label: "Users", icon: "👥", path: "/admin/users" },
    { label: "Requests", icon: "📦", path: "/admin/requests" },
    { label: "Reports", icon: "📊", path: "/admin/reports" },
    { label: "Settings", icon: "⚙️", path: "/admin/settings" },
  ];

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logo} onClick={() => navigate("/admin/dashboard")}>
          ♻ <span style={styles.logoText}>EcoCycle Admin</span>
        </div>

        <ul style={styles.menu}>
          {menuItems.map((item) => (
            <li
              key={item.label}
              style={styles.menuItem}
              onClick={() => navigate(item.path)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#1abc9c")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <span style={styles.icon}>{item.icon}</span> {item.label}
            </li>
          ))}
        </ul>

        <button style={styles.logoutButton} onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      {/* Main Dashboard */}
      <main style={styles.main}>
        <header style={styles.header}>
          <h2 style={{ color: "#2c3e50" }}>
            Welcome, {admin?.name || "Admin"} 👋
          </h2>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search users, reports..."
              style={styles.searchInput}
            />
          </div>
        </header>

        {/* Stats Section */}
        <section style={styles.statsSection}>
          {dashboardStats.map((stat) => (
            <div
              key={stat.id}
              style={{
                ...styles.statCard,
                borderTop: `4px solid ${stat.color}`,
              }}
            >
              <h3>{stat.title}</h3>
              <p style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </section>

        {/* Quick Actions */}
        <section style={styles.quickActions}>
          <h3>Quick Actions</h3>
          <div style={styles.actionGrid}>
            <div
              style={styles.actionCard}
              onClick={() => navigate("/admin/users")}
            >
              👥 <h4>Manage Users</h4>
              <p>View or remove registered users.</p>
            </div>
            <div
              style={styles.actionCard}
              onClick={() => navigate("/admin/requests")}
            >
              📦 <h4>Manage Requests</h4>
              <p>Track and approve pickup requests.</p>
            </div>
            <div
              style={styles.actionCard}
              onClick={() => navigate("/admin/reports")}
            >
              📊 <h4>Generate Reports</h4>
              <p>Analyze system performance.</p>
            </div>
          </div>
        </section>

        <footer style={styles.footer}>
          <p>© {new Date().getFullYear()} EcoCycle Admin Dashboard</p>
        </footer>
      </main>
    </div>
  );
};

// 🎨 Inline CSS styles
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#f8f9fa",
    fontFamily: "'Poppins', sans-serif",
  },
  sidebar: {
    width: "240px",
    background: "linear-gradient(180deg, #2c3e50 0%, #1a252f 100%)",
    color: "#ecf0f1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "25px 20px",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    cursor: "pointer",
    textAlign: "center",
    color: "#1abc9c",
  },
  logoText: { color: "#ecf0f1", marginLeft: "5px" },
  menu: {
    listStyle: "none",
    padding: 0,
    marginTop: "30px",
  },
  menuItem: {
    padding: "12px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    transition: "background-color 0.3s ease",
  },
  icon: {
    marginRight: "10px",
    fontSize: "18px",
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    marginTop: "auto",
    transition: "background-color 0.3s",
  },
  main: {
    flex: 1,
    padding: "25px 40px",
    overflowY: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
  },
  statsSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  statCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    textAlign: "center",
  },
  quickActions: {
    marginBottom: "40px",
  },
  actionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "10px",
  },
  actionCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    cursor: "pointer",
    transition: "transform 0.3s, box-shadow 0.3s",
    textAlign: "center",
  },
  footer: {
    textAlign: "center",
    color: "#777",
    fontSize: "14px",
    marginTop: "30px",
  },
};

export default AdminDashboard;
