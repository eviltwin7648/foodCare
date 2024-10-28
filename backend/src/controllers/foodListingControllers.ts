import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// Create a new Food Listing
export const createFoodListing = async (req: Request, res: Response) => {
  const {
    title,
    description,
    quantity,
    pickupAddress,
    longitude,
    latitude,
    expirationDate,
    id,
  } = req.body;
  console.log(req.body)
  try {

    const existingDonar = await prisma.donar.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingDonar) {
      console.log("No existing Donar found with ID:", id);
      res.status(404).json({ error: "Donar not found." });
      return 
    }


    const newListing = await prisma.foodListing.create({
      data: {
        title,
        description,
        quantity,
        pickupAddress,
        longitude,
        latitude,
        expirationDate: new Date(expirationDate),
        status: "AVAILABLE",
        Donar: { connect: { id: id }},
   } });
    res.json(newListing);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Could not create food listing." });
  }
};

const ImageUrl = [
  "https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZvb2R8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZvb2R8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZvb2R8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1432139509613-5c4255815697?q=80&w=1585&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

// Get all food listings
export const getAllFoodListings = async (req: Request, res: Response) => {
  try {
    let listings = await prisma.foodListing.findMany();

    // Attach images to each listing
    listings = listings.map((listing, index) => ({
      ...listing,
      image: ImageUrl[index % ImageUrl.length], // Cycle through ImageUrl for each listing
    }));

    res.json(listings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not fetch food listings." });
  }
};



export const getFoodListingById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const listing = await prisma.foodListing.findUnique({
      where: {
        id: id,
      },
    });
    if (!listing) {
      res.status(404).json({ error: "Listing not found." });
      return;
    }
    res.json(listing);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Could not fetch food listing." });
  }
}
export const updateFoodListing = async (req: Request, res: Response) => {}
export const deleteFoodListing = async (req: Request, res: Response) => {}