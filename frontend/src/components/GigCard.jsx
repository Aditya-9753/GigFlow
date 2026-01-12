import { useNavigate } from "react-router-dom";

export default function GigCard({ gig }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/gig/${gig._id}`)}
      style={{
        border: "1px solid #e5e7eb",
        padding: "16px",
        marginBottom: "14px",
        borderRadius: "6px",
        cursor: "pointer",
        background: "#ffffff",
      }}
    >
      <h3 style={{ fontSize: "18px", fontWeight: "700" }}>
        {gig.title}
      </h3>

      <p style={{ color: "#6b7280", margin: "6px 0" }}>
        {gig.description.slice(0, 80)}...
      </p>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontWeight: "600" }}>₹{gig.budget}</span>

        <span
          style={{
            fontSize: "13px",
            padding: "4px 10px",
            borderRadius: "12px",
            background: gig.status === "open" ? "#dcfce7" : "#fee2e2",
            color: gig.status === "open" ? "#166534" : "#991b1b",
          }}
        >
          {gig.status}
        </span>
      </div>
    </div>
  );
}
