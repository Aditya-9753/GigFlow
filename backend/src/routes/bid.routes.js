import express from "express";
import {
  createBid,
  getBidsByGig,
  hireBid,
  getMyBids,
} from "../controllers/bid.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

/* 🔥 STATIC ROUTES FIRST */
router.get("/my", protect, getMyBids);

/* 🔐 ACTION ROUTES */
router.post("/", protect, createBid);
router.patch("/:id/hire", protect, hireBid);

/* 🔥 DYNAMIC ROUTES LAST */
router.get("/:gigId", getBidsByGig);

export default router;
