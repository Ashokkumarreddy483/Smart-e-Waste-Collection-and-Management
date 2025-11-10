import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", { email, password });
      if (res.data === "Login successful") {
        localStorage.setItem("user", JSON.stringify({ email }));
        navigate("/home");
      } else {
        setMessage(res.data);
      }
    } catch (err) {
      setMessage(err.response?.data || "Login failed");
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <p style={styles.subtitle}>Login to continue your e-waste recycling journey</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}

        <p style={styles.footerText}>
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={styles.link}
          >
            Register here
          </span>

        </p>
         <span
                          onClick={() => navigate("/admin/login")}
                          style={styles.link}
                        >
                          If you are admin please login here?
                        </span>
      </div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #27ae60, #2ecc71)",
    fontFamily: "'Poppins', sans-serif",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
    width: "100%",
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
    marginBottom: "25px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px 14px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.3s",
  },
  button: {
    backgroundColor: "#27ae60",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  buttonHover: {
    backgroundColor: "#219150",
  },
  message: {
    color: "red",
    fontWeight: "bold",
    marginTop: "15px",
  },
  footerText: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#555",
  },
  link: {
    color: "#27ae60",
    cursor: "pointer",
    fontWeight: "bold",
    textDecoration: "underline",
  },
};

export default LoginPage;
