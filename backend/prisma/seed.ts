import { PrismaClient, DonarRole, ListingStatus } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create a donor
  const hashedPassword = await bcrypt.hash('password123', 10);
  const donor = await prisma.donar.create({
    data: {
      role: DonarRole.RESTAURANT,
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
  const foodListings = await Promise.all([
    prisma.foodListing.create({
      data: {
        title: 'Fresh Pasta',
        description: 'Homemade pasta with tomato sauce',
        quantity: 10,
        pickupAddress: '123 Main Street, New York',
        expirationDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        status: ListingStatus.AVAILABLE,
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
        status: ListingStatus.AVAILABLE,
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
        status: ListingStatus.AVAILABLE,
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
        status: ListingStatus.AVAILABLE,
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
        status: ListingStatus.AVAILABLE,
        donarId: donor.id,
      },
    }),
  ]);

  console.log('Created food listings:', foodListings);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 