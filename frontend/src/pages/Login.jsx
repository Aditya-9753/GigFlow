import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      await login(form);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <form onSubmit={handleSubmit} style={cardStyle}>
        <h2 style={titleStyle}>Login to GigFlow</h2>

        {error && <p style={errorStyle}>{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
          style={{
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={footerText}>
          Don’t have an account?{" "}
          <Link to="/register" style={linkStyle}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

/* 🔹 Styles */
const pageStyle = {
  minHeight: "80vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const cardStyle = {
  width: "100%",
  maxWidth: "420px",
  padding: "30px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  background: "#ffffff",
};

const titleStyle = {
  fontSize: "24px",
  fontWeight: "800",
  marginBottom: "20px",
  textAlign: "center",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  fontSize: "15px",
  borderRadius: "6px",
  border: "1px solid #ddd",
  marginBottom: "14px",
};

const errorStyle = {
  background: "#fee2e2",
  color: "#991b1b",
  padding: "10px",
  borderRadius: "6px",
  marginBottom: "14px",
  fontSize: "14px",
};

const footerText = {
  marginTop: "16px",
  textAlign: "center",
  fontSize: "14px",
};

const linkStyle = {
  color: "#4f46e5",
  fontWeight: "600",
  textDecoration: "none",
};
