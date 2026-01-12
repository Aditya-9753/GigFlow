import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";

/* ================= APPLY BID ================= */
export const createBid = async (req, res) => {
  try {
    const { gigId, price, message } = req.body;

    if (!gigId || !price || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const gig = await Gig.findById(gigId);
    if (!gig || gig.status !== "open") {
      return res.status(400).json({ message: "Gig not available" });
    }

    // ❌ Owner cannot bid on own gig
    if (gig.ownerId.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "Cannot bid on own gig" });
    }

    // ❌ Prevent duplicate bid
    const exists = await Bid.findOne({
      gigId,
      freelancerId: req.user._id,
    });
    if (exists) {
      return res.status(400).json({ message: "Already applied" });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user._id,
      price,
      message,
    });

    res.status(201).json(bid);
  } catch (error) {
    console.error("CREATE BID ERROR:", error);
    res.status(500).json({ message: "Failed to apply bid" });
  }
};

/* ================= GET BIDS BY GIG ================= */
export const getBidsByGig = async (req, res) => {
  try {
    const bids = await Bid.find({
      gigId: req.params.gigId,
    })
      .populate("freelancerId", "name email")
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (error) {
    console.error("GET BIDS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch bids" });
  }
};

/* ================= HIRE BID ================= */
export const hireBid = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    // Reject all other bids
    await Bid.updateMany(
      { gigId: bid.gigId },
      { status: "rejected" }
    );

    // Hire selected bid
    bid.status = "hired";
    await bid.save();

    // Update gig status
    await Gig.findByIdAndUpdate(bid.gigId, {
      status: "assigned",
    });

    res.json({ message: "Freelancer hired successfully" });
  } catch (error) {
    console.error("HIRE BID ERROR:", error);
    res.status(500).json({ message: "Failed to hire freelancer" });
  }
};

/* ================= GET MY BIDS (DASHBOARD) ================= */
export const getMyBids = async (req, res) => {
  try {
    const bids = await Bid.find({
      freelancerId: req.user._id,
    })
      .populate("gigId", "title budget status")
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (error) {
    console.error("GET MY BIDS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch your bids" });
  }
};
