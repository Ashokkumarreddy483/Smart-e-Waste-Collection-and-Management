import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/admin/login", {
        email,
        password,
      });

      if (response.status === 200) {
        // ✅ Save admin to localStorage
        localStorage.setItem("admin", JSON.stringify(response.data));

        // ✅ Show message briefly then navigate
        setMessage("Login successful");
        setTimeout(() => {
          navigate("/admin/dashboard"); // ✅ Redirect to dashboard
        }, 800);
      }
    } catch (error) {
      setMessage("Invalid credentials, please try again");
      console.error("Login error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Portal 🔐</h2>
        <p style={styles.subtitle}>Login to manage e-waste operations</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        {message && (
          <p
            style={{
              color: message.includes("successful") ? "green" : "red",
              marginTop: "10px",
            }}
          >
            {message}
          </p>
        )}

        <p style={{ marginTop: "15px" }}>
          Not an admin? <Link to="/login">Go to user login</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #2c3e50, #34495e)",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
    width: "90%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    fontSize: "26px",
    marginBottom: "10px",
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: "14px",
    color: "#7f8c8d",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2c3e50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
};

export default AdminLoginPage;
