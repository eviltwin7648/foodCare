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
const foodListingControllers_1 = require("../controllers/foodListingControllers");
const authMiddleware_1 = require("../middleware/authMiddleware");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.authMiddleware, foodListingControllers_1.createFoodListing);
router.get("/", foodListingControllers_1.getAllFoodListings); //allthe food listings
router.get("/:id", foodListingControllers_1.getFoodListingById);
router.put("/:id", foodListingControllers_1.updateFoodListing);
router.delete("/:id", foodListingControllers_1.deleteFoodListing);
router.post("/:id/claim", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const claimantId = req.body.id; // Auth middleware sets this in req.body
    console.log(id, claimantId);
    try {
        // Check if the food listing exists and is available
        const foodListing = yield prisma.foodListing.findUnique({
            where: { id },
        });
        if (!foodListing || foodListing.status !== "AVAILABLE") {
            res.status(400).json({ error: "Food listing is not available for claim." });
            return;
        }
        // Create a new claim
        const claim = yield prisma.claim.create({
            data: {
                foodListingId: id,
                claimantId,
                status: "PENDING",
            },
        });
        // Update food listing status to "CLAIMED"
        yield prisma.foodListing.update({
            where: { id },
            data: {
                status: "CLAIMED",
            },
        });
        res.json({ message: "Food claimed successfully.", claim });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to claim food listing." });
    }
}));
exports.default = router;
