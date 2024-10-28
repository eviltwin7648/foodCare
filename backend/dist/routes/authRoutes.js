"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControllers_1 = require("../controllers/authControllers");
const router = (0, express_1.Router)();
router.post("/register/donar", authControllers_1.registerDonor);
router.post("/register/receiver", authControllers_1.registerReceiver);
router.post('/login', authControllers_1.loginFunction);
exports.default = router;
