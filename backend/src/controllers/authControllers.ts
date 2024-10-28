import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
require("dotenv").config();

const prisma = new PrismaClient();
// Register a new Donor
export const registerDonor = async (req: Request, res: Response) => {
  const { name, email, password, role, number, address, pincode, city } =req.body;
    console.log(req.body)
  try {
    const newDonor = await prisma.donar.create({
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
    console.log(newDonor)
    res.json(newDonor);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Could not register donor." });
  }
};

// Register a new Receiver
export const registerReceiver = async (req: Request, res: Response) => {
  const { name, email, password, role, number, address, pincode, city } =
    req.body;
  try {
    const newReceiver = await prisma.receiver.create({
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
  } catch (error) {
    res.status(500).json({ error: "Could not register receiver." });
  }
};

// Implement login logic, including password validation and JWT generation
// Login for both Donor and Receiver
export const loginFunction = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Look for the user in both Donor and Receiver tables
    const donor = await prisma.donar.findUnique({ where: { email } });
    const receiver = await prisma.receiver.findUnique({ where: { email } });

    // Determine the role and user data based on which table the user was found in
    const user = donor || receiver;
    const role = donor ? "Donor" : receiver ? "Receiver" : null;

    // If user is not found
    if (!user || !role) {
       res.status(401).json({ error: "Invalid email or password." });
       return
    }

    // Verify password
    if (user.password !== password) {
       res.status(401).json({ error: "Invalid email or password." });
       return
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role,
      },
      process.env.JWT_SECRET as string
    );
    console.log(user)

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

  } catch (error) {
    res.status(500).json({ error: "Could not log in." });
  }
};
