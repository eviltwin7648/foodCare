import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { PrismaClient } from "@prisma/client";
import { getClaims, getDonations, getProfile, getStats, updateProfile } from "../controllers/dashboardControlers";

const router = Router();
const prisma = new PrismaClient();

// Get user profile
router.get("/profile", authMiddleware, getProfile);

// Update user profile
router.put("/profile", authMiddleware, updateProfile);

// Get user's donations (for donors)
router.get("/donations", authMiddleware, getDonations);

// Get user's claims (for receivers)
router.get("/claims", authMiddleware, getClaims);

// Get dashboard statistics
router.get("/stats", authMiddleware, getStats);

export default router; 