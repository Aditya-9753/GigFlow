import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [myGigs, setMyGigs] = useState([]);
  const [myBids, setMyBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const gigsRes = await API.get("/gigs/my");
        setMyGigs(gigsRes.data);

        const bidsRes = await API.get("/bids/my");
        setMyBids(bidsRes.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    if (user) loadDashboard();
  }, [user]);

  if (!user) {
    return <p style={{ padding: "40px" }}>Please login to view your dashboard.</p>;
  }

  if (loading) {
    return <p style={{ padding: "40px" }}>Loading dashboard...</p>;
  }

  return (
    <div style={{ padding: "40px", maxWidth: "1100px", margin: "auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "30px" }}>
        Your Dashboard
      </h1>

      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        {/* ================= MY GIGS ================= */}
        <section style={{ flex: 1, minWidth: "300px" }}>
          <h3 style={sectionTitle}>My Posted Gigs</h3>

          {myGigs.length === 0 && (
            <p style={mutedText}>You haven’t posted any gigs yet.</p>
          )}

          {myGigs.map((gig) => (
            <div key={gig._id} style={cardStyle}>
              <div>
                <h4 style={{ marginBottom: "6px" }}>{gig.title}</h4>
                <p style={mutedText}>Budget: ₹{gig.budget}</p>
              </div>

              <div style={{ textAlign: "right" }}>
                <span style={statusStyle(gig.status)}>
                  {gig.status.toUpperCase()}
                </span>
                <br />
                <Link to={`/gig/${gig._id}`} style={linkStyle}>
                  View →
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* ================= MY BIDS ================= */}
        <section style={{ flex: 1, minWidth: "300px" }}>
          <h3 style={sectionTitle}>My Applied Bids</h3>

          {myBids.length === 0 && (
            <p style={mutedText}>You haven’t applied to any gigs yet.</p>
          )}

          {myBids.map((bid) => (
            <div key={bid._id} style={cardStyle}>
              <div>
                <p>
                  <b>₹{bid.price}</b> on{" "}
                  <Link to={`/gig/${bid.gigId}`} style={linkStyle}>
                    {bid.gigTitle || "Gig"}
                  </Link>
                </p>
                <p style={mutedText}>{bid.message}</p>
              </div>

              <span style={statusStyle(bid.status)}>
                {bid.status.toUpperCase()}
              </span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const sectionTitle = {
  fontSize: "20px",
  fontWeight: "700",
  marginBottom: "16px",
};

const cardStyle = {
  border: "1px solid #e5e7eb",
  padding: "16px",
  borderRadius: "8px",
  marginBottom: "12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const linkStyle = {
  color: "#4f46e5",
  fontWeight: "600",
  textDecoration: "none",
};

const mutedText = {
  color: "#6b7280",
  fontSize: "14px",
};

const statusStyle = (status) => ({
  padding: "4px 10px",
  borderRadius: "12px",
  fontSize: "12px",
  background:
    status === "open"
      ? "#dcfce7"
      : status === "hired"
      ? "#dbeafe"
      : "#fee2e2",
  color:
    status === "open"
      ? "#166534"
      : status === "hired"
      ? "#1e40af"
      : "#991b1b",
});
