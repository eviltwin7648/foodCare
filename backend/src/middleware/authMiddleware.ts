import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

// Replace with your secret key (use environment variables in production)
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

interface JwtPayload {
  id: string;
  role: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(req.headers)
    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Authorization token required" });
      return 
    }

    // Extract token from header
    const token = authHeader.split(" ")[1];

    // Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    console.log(decoded)

    // Attach id and role to req.body
    req.body.id = decoded.id;
    req.body.role = decoded.role;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in auth middleware:", error);
    res.status(403).json({ error: "Invalid or expired token" });
    return
  }
};
