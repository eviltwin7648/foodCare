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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Create a donor
        const hashedPassword = yield bcrypt_1.default.hash('password123', 10);
        const donor = yield prisma.donar.create({
            data: {
                role: client_1.DonarRole.RESTAURANT,
                name: 'John Doe',
                businessName: 'John\'s Restaurant',
                email: 'john@restaurant.com',
                password: hashedPassword,
                number: '+1234567890',
                address: '123 Main Street',
                pincode: '12345',
                city: 'New York',
            },
        });
        console.log('Created donor:', donor);
        // Create 5 food listings
        const foodListings = yield Promise.all([
            prisma.foodListing.create({
                data: {
                    title: 'Fresh Pasta',
                    description: 'Homemade pasta with tomato sauce',
                    quantity: 10,
                    pickupAddress: '123 Main Street, New York',
                    expirationDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
                    status: client_1.ListingStatus.AVAILABLE,
                    donarId: donor.id,
                },
            }),
            prisma.foodListing.create({
                data: {
                    title: 'Bread Basket',
                    description: 'Assorted fresh breads',
                    quantity: 5,
                    pickupAddress: '123 Main Street, New York',
                    expirationDate: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
                    status: client_1.ListingStatus.AVAILABLE,
                    donarId: donor.id,
                },
            }),
            prisma.foodListing.create({
                data: {
                    title: 'Salad Bar',
                    description: 'Fresh mixed salad with dressing',
                    quantity: 8,
                    pickupAddress: '123 Main Street, New York',
                    expirationDate: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
                    status: client_1.ListingStatus.AVAILABLE,
                    donarId: donor.id,
                },
            }),
            prisma.foodListing.create({
                data: {
                    title: 'Dessert Platter',
                    description: 'Assorted desserts and pastries',
                    quantity: 15,
                    pickupAddress: '123 Main Street, New York',
                    expirationDate: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours from now
                    status: client_1.ListingStatus.AVAILABLE,
                    donarId: donor.id,
                },
            }),
            prisma.foodListing.create({
                data: {
                    title: 'Soup Station',
                    description: 'Various hot soups',
                    quantity: 20,
                    pickupAddress: '123 Main Street, New York',
                    expirationDate: new Date(Date.now() + 18 * 60 * 60 * 1000), // 18 hours from now
                    status: client_1.ListingStatus.AVAILABLE,
                    donarId: donor.id,
                },
            }),
        ]);
        console.log('Created food listings:', foodListings);
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
