"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
// Replace with your secret key (use environment variables in production)
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(req.headers);
        console.log(authHeader);
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ error: "Authorization token required" });
            return;
        }
        // Extract token from header
        const token = authHeader.split(" ")[1];
        // Verify and decode the token
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        console.log(decoded);
        // Attach id and role to req.body
        req.body.id = decoded.id;
        req.body.role = decoded.role;
        // Continue to the next middleware or route handler
        next();
    }
    catch (error) {
        console.error("Error in auth middleware:", error);
        res.status(403).json({ error: "Invalid or expired token" });
        return;
    }
};
exports.authMiddleware = authMiddleware;
