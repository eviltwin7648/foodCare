import { Router } from "express";
import { createClaim, deleteClaim, getClaimbyID, getClaims, updateClaim } from "../controllers/claimsControllers";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getClaims);
router.get("/:id", getClaimbyID);
router.put("/:id",updateClaim);
router.delete("/:id", deleteClaim);
router.post("/",authMiddleware, createClaim);

export default router;