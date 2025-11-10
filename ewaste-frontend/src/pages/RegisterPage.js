import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ import navigate

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // ✅ initialize navigate

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        fullName,
        email,
        password,
      });
      setMessage("✅ Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500); // redirect to login after 1.5s
    } catch (err) {
      setMessage("❌ Registration failed. Try again.");
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg, #6ee7b7, #3b82f6)",
      fontFamily: "'Poppins', sans-serif",
    },
    card: {
      background: "#fff",
      padding: "40px 50px",
      borderRadius: "15px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      width: "100%",
      maxWidth: "400px",
      textAlign: "center",
    },
    title: {
      marginBottom: "25px",
      color: "#333",
      fontSize: "28px",
      fontWeight: "600",
    },
    input: {
      width: "100%",
      padding: "12px 15px",
      margin: "10px 0",
      border: "1px solid #ddd",
      borderRadius: "8px",
      fontSize: "15px",
      outline: "none",
      transition: "0.3s",
    },
    button: {
      width: "100%",
      padding: "12px 15px",
      background: "#3b82f6",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "10px",
      transition: "0.3s",
    },
    message: {
      marginTop: "15px",
      fontSize: "14px",
      color: "#444",
    },
    link: {
      color: "#3b82f6",
      cursor: "pointer",
      textDecoration: "underline",
      marginTop: "10px",
      display: "inline-block",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.background = "#2563eb")}
            onMouseOut={(e) => (e.target.style.background = "#3b82f6")}
          >
            Register
          </button>
        </form>

        <p style={styles.message}>{message}</p>

        <span
          onClick={() => navigate("/login")} // ✅ go to login instead of register
          style={styles.link}
        >
          Already have an account? Login here
        </span>
        <span
                  onClick={() => navigate("/admin/login")} // ✅ go to login instead of register
                  style={styles.link}
                >
                  If you are admin please login here?
                </span>
      </div>
    </div>
  );
};

export default RegisterPage;
