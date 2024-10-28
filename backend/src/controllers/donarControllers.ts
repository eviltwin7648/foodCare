import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// Get all donors
export const getAllDonors = async (req: Request, res: Response) => {
  try {
    const donors = await prisma.donar.findMany();
    res.json(donors);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch donors.' });
  }
};

// Get a specific donor by ID
export const getDonorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const donor = await prisma.donar.findUnique({ where: { id } });
    res.json(donor);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch donor.' });
  }
};

// Update donor details
export const updateDonor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedDonor = await prisma.donar.update({ where: { id }, data });
    res.json(updatedDonor);
  } catch (error) {
    res.status(500).json({ error: 'Could not update donor.' });
  }
};

// Delete donor
export const deleteDonor = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.donar.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Could not delete donor.' });
  }
};
