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
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
// Register a new Donor
const registerDonor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role, number, address, pincode, city } = req.body;
    console.log(req.body);
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        const newDonor = yield prisma.donar.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
                number,
                address,
                pincode,
                city,
            },
        });
        console.log(newDonor);
        res.json({ message: "Donor registered successfully" });
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
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        const newReceiver = yield prisma.receiver.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
                number,
                address,
                pincode,
                city,
            },
        });
        res.json({ message: "Receiver registered successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Could not register receiver." });
    }
});
exports.registerReceiver = registerReceiver;
const loginFunction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const donor = yield prisma.donar.findUnique({ where: { email } });
        const receiver = yield prisma.receiver.findUnique({ where: { email } });
        const user = donor || receiver;
        const role = donor ? "Donor" : receiver ? "Receiver" : null;
        if (!user || !role) {
            res.status(401).json({ error: "Invalid email or password." });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: "Invalid email or password." });
            return;
        }
        console.log("Before JWT", user);
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            role,
        }, process.env.JWT_SECRET);
        console.log("After JWT", user);
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
        console.log(error);
        res.status(500).json({ error: "Could not log in." });
        throw new Error;
    }
});
exports.loginFunction = loginFunction;
