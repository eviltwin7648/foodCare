import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const getProfile = async (req: Request, res: Response) => {
    try {
      const userId = req.body.id;
      const role = req.body.role;
      console.log("userId", userId, "role", role)
  
      let profile;
      if (role === "Donor") {
        profile = await prisma.donar.findUnique({
          where: { id: userId },
          select: {
            id: true,
            name: true,
            email: true,
            number: true,
            address: true,
            city: true,
            pincode: true,
          },
        });
      } else {
        profile = await prisma.receiver.findUnique({
          where: { id: userId },
          select: {
            id: true,
            name: true,
            email: true,
            number: true,
            address: true,
            city: true,
            pincode: true,
          },
        });
      }
  
      if (!profile) {
        res.status(404).json({ error: "Profile not found" });
        return;
      }
  
      res.json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch profile" });
    }
}  

export const updateProfile = async (req: Request, res: Response) => {
    try {
      const userId = req.body.id;
      const role = req.body.role;
      const { name, number, address, city, pincode } = req.body;
  
      let updatedProfile;
      if (role === "Donor") {
        updatedProfile = await prisma.donar.update({
          where: { id: userId },
          data: {
            name,
            number,
            address,
            city,
            pincode,
          },
          select: {
            id: true,
            name: true,
            email: true,
            number: true,
            address: true,
            city: true,
            pincode: true,
          },
        });
      } else {
        updatedProfile = await prisma.receiver.update({
          where: { id: userId },
          data: {
            name,
            number,
            address,
            city,
            pincode,
          },
          select: {
            id: true,
            name: true,
            email: true,
            number: true,
            address: true,
            city: true,
            pincode: true,
          },
        });
      }
  
      res.json(updatedProfile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update profile" });
    }
  }
  
export const getDonations = async (req: Request, res: Response) => {
    try {
      const userId = req.body.id;
      const role = req.body.role;
  
      if (role !== "Donor") {
        res.status(403).json({ error: "Access denied" });
        return;
      }
  
      const donations = await prisma.foodListing.findMany({
        where: {
          donarId: userId,
        },
        include: {
          Claim: {
            include: {
              claimant: {
                select: {
                  name: true,
                  number: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
  
      res.json(donations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch donations" });
    }
  }

export const getClaims = async (req: Request, res: Response) => {
    try {
      const userId = req.body.id;
      const role = req.body.role;
  
        if (role !== "Receiver") {
        res.status(403).json({ error: "Access denied" });
        return;
      }
  
      const claims = await prisma.claim.findMany({
        where: {
          claimantId: userId,
        },
        include: {
          foodListing: {
            include: {
              Donar: {
                select: {
                  name: true,
                  number: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
  
      res.json(claims);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch claims" });
    }
  }

export const getStats =  async (req: Request, res: Response) => {
    try {
      const userId = req.body.id;
      const role = req.body.role;
  
      let stats;
      if (role === "Donor") {
        // Donor statistics
        const totalDonations = await prisma.foodListing.count({
          where: { donarId: userId },
        });
  
        const activeDonations = await prisma.foodListing.count({
          where: { 
            donarId: userId,
            status: "AVAILABLE",
          },
        });
  
        const claimedDonations = await prisma.foodListing.count({
          where: { 
            donarId: userId,
            status: "CLAIMED",
          },
        });
  
        stats = {
          totalDonations,
          activeDonations,
          claimedDonations,
        };
      } else {
        // Receiver statistics
        const totalClaims = await prisma.claim.count({
          where: { claimantId: userId },
        });
  
        const pendingClaims = await prisma.claim.count({
          where: { 
            claimantId: userId,
            status: "PENDING",
          },
        });
  
        const completedClaims = await prisma.claim.count({
          where: { 
            claimantId: userId,
            status: "COMPLETED",
          },
        });
  
        stats = {
          totalClaims,
          pendingClaims,
          completedClaims,
        };
      }
  
      res.json(stats);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch statistics" });
    }
  }