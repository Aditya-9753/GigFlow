import Gig from "../models/Gig.js";

/* CREATE */
export const createGig = async (req, res) => {
  const { title, description, budget, contactEmail, contactPhone } = req.body;

  if (!title || !description || !budget || !contactEmail) {
    return res.status(400).json({ message: "All fields required" });
  }

  const gig = await Gig.create({
    title,
    description,
    budget,
    contactEmail,
    contactPhone,
    ownerId: req.user._id,
  });

  res.status(201).json(gig);
};

/* ALL GIGS */
export const getGigs = async (req, res) => {
  const search = req.query.search || "";
  const gigs = await Gig.find({
    title: { $regex: search, $options: "i" },
  }).sort({ createdAt: -1 });

  res.json(gigs);
};

/* SINGLE GIG */
export const getGigById = async (req, res) => {
  const gig = await Gig.findById(req.params.id);
  if (!gig) return res.status(404).json({ message: "Gig not found" });
  res.json(gig);
};

/* MY GIGS */
export const getMyGigs = async (req, res) => {
  const gigs = await Gig.find({ ownerId: req.user._id });
  res.json(gigs);
};
