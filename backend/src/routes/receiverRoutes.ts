import { Router } from "express";
import { deleteReceiver, getAllReceivers, getReceiverById, updateReceiver } from "../controllers/receiverControllers";

const router = Router();

router.get("/", getAllReceivers);
router.get("/:id", getReceiverById);
router.put("/:id", updateReceiver);
router.delete("/:id", deleteReceiver);

export default router;
