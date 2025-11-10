import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminSettingsPage.css";

const AdminSettingsPage = () => {
  const [admin, setAdmin] = useState({
    id: "",
    username: "",
    email: "",
    phone: "",
    theme: "light",
    notifications: true,
  });
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const fetchAdminProfile = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/profile");
      setAdmin(res.data);
      applyTheme(res.data.theme);
    } catch (error) {
      console.error("Error fetching admin profile:", error);
    }
  };

  const applyTheme = (theme) => {
    document.body.className = theme === "dark" ? "dark-theme" : "light-theme";
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setAdmin((prev) => ({ ...prev, [name]: newValue }));

    if (name === "theme") applyTheme(value);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await axios.put("http://localhost:8080/api/admin/profile", admin);
      setMessage("✅ Settings saved successfully!");
    } catch (error) {
      setMessage("❌ Failed to save settings.");
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">⚙️ Admin Settings</h2>
      {message && <p className="settings-message">{message}</p>}

      <div className="settings-card">
        <h3>👤 Profile Information</h3>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={admin.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={admin.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={admin.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="settings-card">
        <h3>🌗 Preferences</h3>
        <div className="form-group">
          <label>Theme</label>
          <select name="theme" value={admin.theme} onChange={handleChange}>
            <option value="light">Light Mode</option>
            <option value="dark">Dark Mode</option>
          </select>
        </div>
        <div className="form-group checkbox-group">
          <label>Enable Notifications</label>
          <input
            type="checkbox"
            name="notifications"
            checked={admin.notifications}
            onChange={handleChange}
          />
        </div>
      </div>

      <button className="save-btn" onClick={handleSave} disabled={isSaving}>
        {isSaving ? "Saving..." : "💾 Save Changes"}
      </button>
    </div>
  );
};

export default AdminSettingsPage;
