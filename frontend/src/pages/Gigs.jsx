import { useState, useEffect } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

export default function Gigs() {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // 'all', 'open', 'assigned'

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        setLoading(true);
        // Backend requirement: Fetch with search query 
        const { data } = await API.get(`/gigs?search=${search}`);
        setGigs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGigs();
  }, [search]);

  // Client side filtering logic
  const filteredGigs = gigs.filter(gig => {
    if (filter === "all") return true;
    return gig.status === filter;
  });

  return (
    <div style={{ padding: "40px", maxWidth: "1100px", margin: "auto" }}>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        {/* 🔍 Search Input */}
        <input
          type="text"
          placeholder="Search gigs by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "14px",
            flex: 1,
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        />

        {/* 📑 Status Filter Tabs */}
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
        >
          <option value="all">All Gigs</option>
          <option value="open">Available (Open)</option>
          <option value="assigned">Hired (Assigned)</option>
        </select>
      </div>

      {loading && <p>Loading gigs...</p>}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "24px",
      }}>
        {filteredGigs.map((gig) => (
          <div key={gig._id} style={{
            border: "1px solid #eee",
            padding: "22px",
            borderRadius: "14px",
            background: "#ffffff",
            opacity: gig.status === "assigned" ? 0.7 : 1, // Hired gig thoda fade dikhega
            boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
          }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700" }}>{gig.title}</h3>
            <p style={{ color: "#4b5563" }}>Budget: <b>₹{gig.budget}</b></p>

            {/* Status Badge Logic [cite: 33] */}
            <span style={{
              display: "inline-block",
              padding: "4px 10px",
              fontSize: "12px",
              borderRadius: "12px",
              marginTop: "10px",
              background: gig.status === "open" ? "#dcfce7" : "#e0e7ff",
              color: gig.status === "open" ? "#166534" : "#4338ca",
            }}>
              {gig.status === "open" ? "🟢 OPEN" : "🔵 HIRED / ASSIGNED"}
            </span>

            <div style={{ marginTop: "12px" }}>
              <Link to={`/gig/${gig._id}`} style={{ color: "#4f46e5", fontWeight: "600", textDecoration: "none" }}>
                {gig.status === "open" ? "View & Bid →" : "View Details →"}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}