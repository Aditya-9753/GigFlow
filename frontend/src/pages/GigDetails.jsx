import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function GigDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [gig, setGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Load gig + bids
  const loadData = async () => {
    try {
      const gigRes = await API.get(`/gigs/${id}`);
      setGig(gigRes.data);

      const bidRes = await API.get(`/bids/${id}`);
      setBids(bidRes.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load gig details");
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  // 🔹 Submit Bid
  const submitBid = async () => {
    if (!price || !message) {
      alert("Price and message required");
      return;
    }

    try {
      setLoading(true);
      await API.post("/bids", {
        gigId: id,
        price,
        message,
      });
      alert("Bid submitted");
      setPrice("");
      setMessage("");
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Bid failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Hire Freelancer
  const hireBid = async (bidId) => {
    try {
      await API.patch(`/bids/${bidId}/hire`);
      alert("Freelancer hired");
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Hire failed");
    }
  };

  if (!gig) return <p style={{ padding: "40px" }}>Loading...</p>;

  const isOwner = user && user._id === gig.ownerId;

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto" }}>
      {/* 🔹 Gig Info */}
      <h1 style={{ fontSize: "28px", fontWeight: "800" }}>{gig.title}</h1>
      <p style={{ margin: "10px 0", color: "#4b5563" }}>{gig.description}</p>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <span><b>Budget:</b> ₹{gig.budget}</span>
        <span
          style={{
            padding: "4px 12px",
            borderRadius: "12px",
            fontSize: "13px",
            background: gig.status === "open" ? "#dcfce7" : "#fee2e2",
            color: gig.status === "open" ? "#166534" : "#991b1b",
          }}
        >
          {gig.status.toUpperCase()}
        </span>
      </div>

      <hr style={{ margin: "30px 0" }} />

      {/* 🔹 OWNER VIEW */}
      {isOwner ? (
        <>
          <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "20px" }}>
            Bids on your Gig
          </h2>

          {bids.length === 0 && <p>No bids yet</p>}

          {bids.map((bid) => (
            <div
              key={bid._id}
              style={{
                border: "1px solid #e5e7eb",
                padding: "16px",
                marginBottom: "12px",
                borderRadius: "6px",
              }}
            >
              <p><b>₹{bid.price}</b></p>
              <p>{bid.message}</p>

              <div style={{ marginTop: "10px" }}>
                {bid.status === "pending" && gig.status === "open" && (
                  <button
                    onClick={() => hireBid(bid._id)}
                    className="btn btn-primary"
                  >
                    Hire
                  </button>
                )}

                {bid.status === "hired" && (
                  <span style={{ color: "green", fontWeight: "700" }}>
                    HIRED
                  </span>
                )}

                {bid.status === "rejected" && (
                  <span style={{ color: "#991b1b" }}>Rejected</span>
                )}
              </div>
            </div>
          ))}
        </>
      ) : (
        /* 🔹 FREELANCER VIEW */
        <>
          <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "10px" }}>
            Submit a Bid
          </h3>

          {gig.status !== "open" ? (
            <p>This gig is no longer accepting bids.</p>
          ) : (
            <div style={{ background: "#f9fafb", padding: "20px", borderRadius: "6px" }}>
              <input
                type="number"
                placeholder="Your Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              />

              <textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ width: "100%", height: "100px", padding: "10px" }}
              />

              <button
                onClick={submitBid}
                className="btn btn-primary"
                style={{ marginTop: "10px" }}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Bid"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
