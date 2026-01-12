import express from "express";
import {
  createGig,
  getGigs,
  getGigById,
  getMyGigs,
} from "../controllers/gig.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createGig);
router.get("/", getGigs);
router.get("/my", protect, getMyGigs);
router.get("/:id", getGigById);

export default router;
