import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function PostGig() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    contactEmail: "",
    contactPhone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.budget || !form.contactEmail) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      await API.post("/gigs", {
        title: form.title,
        description: form.description,
        budget: Number(form.budget),
        contactEmail: form.contactEmail,
        contactPhone: form.contactPhone,
      });

      alert("Gig posted successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to post gig");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ fontSize: "26px", fontWeight: "800", marginBottom: "20px" }}>
        Create a New Gig
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          border: "1px solid #eee",
          padding: "24px",
          borderRadius: "10px",
          background: "#fff",
        }}
      >
        <input
          name="title"
          placeholder="Gig Title"
          value={form.title}
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={{ ...inputStyle, height: "100px" }}
        />

        <input
          name="budget"
          type="number"
          placeholder="Budget (₹)"
          value={form.budget}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="contactEmail"
          type="email"
          placeholder="Contact Email (required)"
          value={form.contactEmail}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="contactPhone"
          placeholder="Contact Phone / WhatsApp (optional)"
          value={form.contactPhone}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? "Posting..." : "Post Gig"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  fontSize: "15px",
  borderRadius: "6px",
  border: "1px solid #ddd",
};
