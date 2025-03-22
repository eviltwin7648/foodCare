"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// Get user profile
router.get("/profile", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.id;
        const role = req.body.role;
        console.log("userId", userId, "role", role);
        let profile;
        if (role === "Donor") {
            profile = yield prisma.donar.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    number: true,
                    address: true,
                    city: true,
                    pincode: true,
                },
            });
        }
        else {
            profile = yield prisma.receiver.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    number: true,
                    address: true,
                    city: true,
                    pincode: true,
                },
            });
        }
        if (!profile) {
            res.status(404).json({ error: "Profile not found" });
            return;
        }
        res.json(profile);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch profile" });
    }
}));
// Update user profile
router.put("/profile", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.id;
        const role = req.body.role;
        const { name, number, address, city, pincode } = req.body;
        let updatedProfile;
        if (role === "Donor") {
            updatedProfile = yield prisma.donar.update({
                where: { id: userId },
                data: {
                    name,
                    number,
                    address,
                    city,
                    pincode,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    number: true,
                    address: true,
                    city: true,
                    pincode: true,
                },
            });
        }
        else {
            updatedProfile = yield prisma.receiver.update({
                where: { id: userId },
                data: {
                    name,
                    number,
                    address,
                    city,
                    pincode,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    number: true,
                    address: true,
                    city: true,
                    pincode: true,
                },
            });
        }
        res.json(updatedProfile);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update profile" });
    }
}));
// Get user's donations (for donors)
router.get("/donations", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.id;
        const role = req.body.role;
        if (role !== "Donor") {
            res.status(403).json({ error: "Access denied" });
            return;
        }
        const donations = yield prisma.foodListing.findMany({
            where: {
                donarId: userId,
            },
            include: {
                Claim: {
                    include: {
                        claimant: {
                            select: {
                                name: true,
                                number: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json(donations);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch donations" });
    }
}));
// Get user's claims (for receivers)
router.get("/claims", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.id;
        const role = req.body.role;
        if (role !== "NGO" && role !== "Individual") {
            res.status(403).json({ error: "Access denied" });
            return;
        }
        const claims = yield prisma.claim.findMany({
            where: {
                claimantId: userId,
            },
            include: {
                foodListing: {
                    include: {
                        Donar: {
                            select: {
                                name: true,
                                number: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json(claims);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch claims" });
    }
}));
// Get dashboard statistics
router.get("/stats", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.id;
        const role = req.body.role;
        let stats;
        if (role === "Donor") {
            // Donor statistics
            const totalDonations = yield prisma.foodListing.count({
                where: { donarId: userId },
            });
            const activeDonations = yield prisma.foodListing.count({
                where: {
                    donarId: userId,
                    status: "AVAILABLE",
                },
            });
            const claimedDonations = yield prisma.foodListing.count({
                where: {
                    donarId: userId,
                    status: "CLAIMED",
                },
            });
            stats = {
                totalDonations,
                activeDonations,
                claimedDonations,
            };
        }
        else {
            // Receiver statistics
            const totalClaims = yield prisma.claim.count({
                where: { claimantId: userId },
            });
            const pendingClaims = yield prisma.claim.count({
                where: {
                    claimantId: userId,
                    status: "PENDING",
                },
            });
            const completedClaims = yield prisma.claim.count({
                where: {
                    claimantId: userId,
                    status: "COMPLETED",
                },
            });
            stats = {
                totalClaims,
                pendingClaims,
                completedClaims,
            };
        }
        res.json(stats);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch statistics" });
    }
}));
exports.default = router;
