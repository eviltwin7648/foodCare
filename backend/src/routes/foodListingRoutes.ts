import { Router } from "express";
import {
  createFoodListing,
  deleteFoodListing,
  getAllFoodListings,
  getFoodListingById,
  updateFoodListing,
} from "../controllers/foodListingControllers";
import { authMiddleware } from "../middleware/authMiddleware";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const router = Router();

router.post("/",authMiddleware, createFoodListing);

router.get("/", getAllFoodListings); //allthe food listings

router.get("/:id", getFoodListingById);

router.put("/:id", updateFoodListing);

router.delete("/:id", deleteFoodListing);

router.post("/:id/claim", authMiddleware, async (req, res) => {
  const { id } = req.params;
    const claimantId = req.body.id; // Auth middleware sets this in req.body

    console.log(id, claimantId);
    try {
      // Check if the food listing exists and is available
      const foodListing = await prisma.foodListing.findUnique({
        where: { id },
      });

      if (!foodListing || foodListing.status !== "AVAILABLE") {
        res.status(400).json({ error: "Food listing is not available for claim." });
        return
      }

      // Create a new claim
      const claim = await prisma.claim.create({
        data: {
          foodListingId: id,
          claimantId,
          status: "PENDING",
        },
      });

      // Update food listing status to "CLAIMED"
      await prisma.foodListing.update({
        where: { id },
        data: {
          status: "CLAIMED",
        },
      });

      res.json({ message: "Food claimed successfully.", claim });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to claim food listing." });
    }
});

export default router;
