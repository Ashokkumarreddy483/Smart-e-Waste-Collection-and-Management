import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { FaRecycle, FaSearch, FaUserCircle } from "react-icons/fa";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import SchedulePickupPage from "./pages/SchedulePickupPage";
import RequestTrackingPage from "./pages/RequestTrackingPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminRequestsPage from "./pages/AdminRequestsPage";
import AdminReportsPage from "./pages/AdminReportsPage";
import AdminSettingsPage from "./pages/AdminSettingsPage";
import PickupOrdersPage from "./pages/PickupOrdersPage";
import LearnToRecyclePage from "./pages/LearnToRecyclePage";

// ✅ Product Category Pages
import OldMobiles from "./pages/OldMobiles";
import Laptops from "./pages/Laptops";
import Batteries from "./pages/Batteries";
import Appliances from "./pages/Appliances";
import AddItemPage from "./pages/AddItemPage"; // ✅ NEW PAGE for adding new phones/items

import "./App.css";

// ✅ Navbar Component
const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <header className="navbar">
      {/* Logo */}
      <div className="logo" onClick={() => navigate("/")}>
        <FaRecycle className="logo-icon" />
        <span className="logo-text">EcoCycle</span>
      </div>

      {/* Search Bar */}
      {(user || admin) && (
        <div className="search-bar">
          <input type="text" placeholder="Search for e-waste items..." />
          <button>
            <FaSearch />
          </button>
        </div>
      )}

      {/* Navigation Links */}
      <div className="nav-links">
        {admin ? (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/requests">Requests</Link>
            <Link to="/pickup-orders">Orders</Link>
            <Link to="/admin/reports">Reports</Link>
            <Link to="/admin/settings">Settings</Link>
            <span className="welcome">Hello, Admin</span>
            <button className="logout-btn" onClick={handleLogout}>
              <FaUserCircle /> Logout
            </button>
          </>
        ) : user ? (
          <>
            <Link to="/home">Home</Link>
            <Link to="/schedule-pickup">Schedule Pickup</Link>
            <Link to="/request-tracking">Request Tracking</Link>
            <Link to="/pickup-orders">Orders</Link>
            <Link to="/learn-recycle">Recycle</Link>
            <Link to="/oldmobiles">Old Mobiles</Link>
            <span className="welcome">
              Hello, {user?.email?.split("@")[0] || "Eco Warrior"}
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              <FaUserCircle /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/admin/login">Admin</Link>
          </>
        )}
      </div>
    </header>
  );
};

// ✅ Protected Route
const ProtectedRoute = ({ element: Component, allowed }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  if (allowed === "user" && !user) return <Navigate to="/login" />;
  if (allowed === "admin" && !admin) return <Navigate to="/admin/login" />;
  return Component;
};

// ✅ Main App Component
function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  return (
    <Router>
      <Navbar />
      <div className="main-container">
        <Routes>
          {/* Default Route */}
          <Route
            path="/"
            element={
              admin ? (
                <Navigate to="/admin/dashboard" />
              ) : user ? (
                <Navigate to="/home" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* User Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<ProtectedRoute element={<HomePage />} allowed="user" />} />
          <Route path="/schedule-pickup" element={<ProtectedRoute element={<SchedulePickupPage />} allowed="user" />} />
          <Route path="/request-tracking" element={<ProtectedRoute element={<RequestTrackingPage />} allowed="user" />} />
          <Route path="/pickup-orders" element={<ProtectedRoute element={<PickupOrdersPage />} allowed="user" />} />
          <Route path="/learn-recycle" element={<ProtectedRoute element={<LearnToRecyclePage />} allowed="user" />} />

          {/* Product Pages */}
          <Route path="/oldmobiles" element={<ProtectedRoute element={<OldMobiles />} allowed="user" />} />
          <Route path="/laptops" element={<ProtectedRoute element={<Laptops />} allowed="user" />} />
          <Route path="/batteries" element={<ProtectedRoute element={<Batteries />} allowed="user" />} />
          <Route path="/appliances" element={<ProtectedRoute element={<Appliances />} allowed="user" />} />
          <Route path="/add-item" element={<ProtectedRoute element={<AddItemPage />} allowed="user" />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} allowed="admin" />} />
          <Route path="/admin/users" element={<ProtectedRoute element={<AdminUsersPage />} allowed="admin" />} />
          <Route path="/admin/requests" element={<ProtectedRoute element={<AdminRequestsPage />} allowed="admin" />} />
          <Route path="/admin/reports" element={<ProtectedRoute element={<AdminReportsPage />} allowed="admin" />} />
          <Route path="/admin/settings" element={<ProtectedRoute element={<AdminSettingsPage />} allowed="admin" />} />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
