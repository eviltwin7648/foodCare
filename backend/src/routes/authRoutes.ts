import { Router } from "express";
import {  loginFunction, registerDonor, registerReceiver } from "../controllers/authControllers";

const router = Router();

router.post("/register/donar",registerDonor);

router.post("/register/receiver", registerReceiver);

router.post('/login', loginFunction);

export default router;
