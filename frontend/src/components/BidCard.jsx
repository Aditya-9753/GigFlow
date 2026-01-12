export default function BidCard({ bid, onHire }) {
  return (
    <div className="border p-2 mb-2">
      <p>{bid.message}</p>
      <p>₹{bid.price}</p>
      {bid.status === "pending" && (
        <button onClick={() => onHire(bid._id)}>Hire</button>
      )}
      <p>Status: {bid.status}</p>
    </div>
  );
}
