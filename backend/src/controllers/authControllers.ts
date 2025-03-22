import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
require("dotenv").config();
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
// Register a new Donor
export const registerDonor = async (req: Request, res: Response) => {
  const { name, email, password, role, number, address, pincode, city } =req.body;
    console.log(req.body)
    const hashedPassword = await  bcrypt.hash(password, 10);
  try {
    const newDonor = await prisma.donar.create({
      data: {
        name,
        email,
        password:hashedPassword,
        role,
        number,
        address,
        pincode,
        city,
      },
    });
    console.log(newDonor)
    res.json({message: "Donor registered successfully"});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Could not register donor." });
  }
};

// Register a new Receiver
export const registerReceiver = async (req: Request, res: Response) => {
  const { name, email, password, role, number, address, pincode, city } =
    req.body;
    const hashedPassword = await  bcrypt.hash(password, 10);
  try {
    const newReceiver = await prisma.receiver.create({
      data: {
        name,
        email,
        password:hashedPassword,
        role,
        number,
        address,
        pincode,
        city,
      },
    });
    res.json({message: "Receiver registered successfully"});
  } catch (error) {
    res.status(500).json({ error: "Could not register receiver." });
  }
};


export const loginFunction = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const donor = await prisma.donar.findUnique({ where: { email } });
    const receiver = await prisma.receiver.findUnique({ where: { email } });

    const user = donor || receiver;
    const role = donor ? "Donor" : receiver ? "Receiver" : null;

    if (!user || !role) {
       res.status(401).json({ error: "Invalid email or password." });
       return
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
       res.status(401).json({ error: "Invalid email or password." });
       return
    }
console.log("Before JWT",user)
    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role,
      },
      process.env.JWT_SECRET as string
    );
    console.log("After JWT",user)

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
    console.log(error)
    res.status(500).json({ error: "Could not log in." });
    throw new Error
  }
};
