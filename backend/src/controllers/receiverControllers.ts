import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Get all receivers

export const getAllReceivers = async (req: Request, res: Response) => {
  try {
    const receivers = await prisma.receiver.findMany();
    res.json(receivers);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch receivers.' });
  }
};

// Get a specific receiver by ID
export const getReceiverById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const receiver = await prisma.receiver.findUnique({ where: { id } });
    res.json(receiver);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch receiver.' });
  }
};

// Update receiver details
export const updateReceiver = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updatedReceiver = await prisma.receiver.update({ where: { id }, data });
    res.json(updatedReceiver);
  } catch (error) {
    res.status(500).json({ error: 'Could not update receiver.' });
  }
};

// Delete receiver
export const deleteReceiver = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.receiver.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Could not delete receiver.' });
  }
};
