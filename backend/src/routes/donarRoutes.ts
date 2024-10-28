import { Router } from "express";
import {
  deleteDonor,
  getAllDonors,
  getDonorById,
  updateDonor,
} from "../controllers/donarControllers";

const router = Router();

router.get("/", getAllDonors);
router.put("/:id", updateDonor);
router.get("/:id", getDonorById);
router.delete("/:id", deleteDonor);

export default router;
