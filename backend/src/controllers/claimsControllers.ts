import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// Create a Claim
export const createClaim = async (req: Request, res: Response) => {
  const { foodListingId, claimantId } = req.body;
  try {
    const newClaim = await prisma.claim.create({
      data: {
        foodListing: { connect: { id: foodListingId } },
        claimant: { connect: { id: claimantId } },
        status: 'PENDING',
      },
    });
    res.json(newClaim);
  } catch (error) {
    res.status(500).json({ error: 'Could not create claim.' });
  }
};


export const getClaims = async (req: Request, res: Response) => {};
export const getClaimbyID = async (req: Request, res: Response) => {};
export const updateClaim = async (req: Request, res: Response) => {};
export const deleteClaim = async (req: Request, res: Response) => {};
