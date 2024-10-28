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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFoodListing = exports.updateFoodListing = exports.getFoodListingById = exports.getAllFoodListings = exports.createFoodListing = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Create a new Food Listing
const createFoodListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, quantity, pickupAddress, longitude, latitude, expirationDate, id, } = req.body;
    console.log(req.body);
    try {
        const existingDonar = yield prisma.donar.findUnique({
            where: {
                id: id,
            },
        });
        if (!existingDonar) {
            console.log("No existing Donar found with ID:", id);
            res.status(404).json({ error: "Donar not found." });
            return;
        }
        const newListing = yield prisma.foodListing.create({
            data: {
                title,
                description,
                quantity,
                pickupAddress,
                longitude,
                latitude,
                expirationDate: new Date(expirationDate),
                status: "AVAILABLE",
                Donar: { connect: { id: id } },
            }
        });
        res.json(newListing);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Could not create food listing." });
    }
});
exports.createFoodListing = createFoodListing;
const ImageUrl = [
    "https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZvb2R8ZW58MHx8MHx8fDA%3D",
    "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZvb2R8ZW58MHx8MHx8fDA%3D",
    "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZvb2R8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1432139509613-5c4255815697?q=80&w=1585&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
// Get all food listings
const getAllFoodListings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let listings = yield prisma.foodListing.findMany();
        // Attach images to each listing
        listings = listings.map((listing, index) => (Object.assign(Object.assign({}, listing), { image: ImageUrl[index % ImageUrl.length] })));
        res.json(listings);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Could not fetch food listings." });
    }
});
exports.getAllFoodListings = getAllFoodListings;
const getFoodListingById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const listing = yield prisma.foodListing.findUnique({
            where: {
                id: id,
            },
        });
        if (!listing) {
            res.status(404).json({ error: "Listing not found." });
            return;
        }
        res.json(listing);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Could not fetch food listing." });
    }
});
exports.getFoodListingById = getFoodListingById;
const updateFoodListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateFoodListing = updateFoodListing;
const deleteFoodListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteFoodListing = deleteFoodListing;
