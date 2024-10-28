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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginFunction = exports.registerReceiver = exports.registerDonor = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const prisma = new client_1.PrismaClient();
// Register a new Donor
const registerDonor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role, number, address, pincode, city } = req.body;
    console.log(req.body);
    try {
        const newDonor = yield prisma.donar.create({
            data: {
                name,
                email,
                password,
                role,
                number,
                address,
                pincode,
                city,
            },
        });
        console.log(newDonor);
        res.json(newDonor);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Could not register donor." });
    }
});
exports.registerDonor = registerDonor;
// Register a new Receiver
const registerReceiver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role, number, address, pincode, city } = req.body;
    try {
        const newReceiver = yield prisma.receiver.create({
            data: {
                name,
                email,
                password, // Ideally, hash this before saving
                role,
                number,
                address,
                pincode,
                city,
            },
        });
        res.json(newReceiver);
    }
    catch (error) {
        res.status(500).json({ error: "Could not register receiver." });
    }
});
exports.registerReceiver = registerReceiver;
// Implement login logic, including password validation and JWT generation
// Login for both Donor and Receiver
const loginFunction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Look for the user in both Donor and Receiver tables
        const donor = yield prisma.donar.findUnique({ where: { email } });
        const receiver = yield prisma.receiver.findUnique({ where: { email } });
        // Determine the role and user data based on which table the user was found in
        const user = donor || receiver;
        const role = donor ? "Donor" : receiver ? "Receiver" : null;
        // If user is not found
        if (!user || !role) {
            res.status(401).json({ error: "Invalid email or password." });
            return;
        }
        // Verify password
        if (user.password !== password) {
            res.status(401).json({ error: "Invalid email or password." });
            return;
        }
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            role,
        }, process.env.JWT_SECRET);
        console.log(user);
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                name: user.name,
            },
        });
    }
    catch (error) {
        res.status(500).json({ error: "Could not log in." });
    }
});
exports.loginFunction = loginFunction;
