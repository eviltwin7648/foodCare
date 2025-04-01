"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const client_1 = require("@prisma/client");
const dashboardControlers_1 = require("../controllers/dashboardControlers");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// Get user profile
router.get("/profile", authMiddleware_1.authMiddleware, dashboardControlers_1.getProfile);
// Update user profile
router.put("/profile", authMiddleware_1.authMiddleware, dashboardControlers_1.updateProfile);
// Get user's donations (for donors)
router.get("/donations", authMiddleware_1.authMiddleware, dashboardControlers_1.getDonations);
// Get user's claims (for receivers)
router.get("/claims", authMiddleware_1.authMiddleware, dashboardControlers_1.getClaims);
// Get dashboard statistics
router.get("/stats", authMiddleware_1.authMiddleware, dashboardControlers_1.getStats);
exports.default = router;
