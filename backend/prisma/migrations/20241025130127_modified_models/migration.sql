/*
  Warnings:

  - You are about to drop the column `claimedById` on the `FoodListing` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `FoodListing` table. All the data in the column will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "DonarRole" AS ENUM ('RETAILER', 'RESTAURANT', 'INDIVIDUAL');

-- CreateEnum
CREATE TYPE "ReceiverRole" AS ENUM ('NGO', 'INDIVIDUAL');

-- DropForeignKey
ALTER TABLE "Claim" DROP CONSTRAINT "Claim_claimantId_fkey";

-- DropForeignKey
ALTER TABLE "FoodListing" DROP CONSTRAINT "FoodListing_claimedById_fkey";

-- DropForeignKey
ALTER TABLE "FoodListing" DROP CONSTRAINT "FoodListing_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- AlterTable
ALTER TABLE "FoodListing" DROP COLUMN "claimedById",
DROP COLUMN "createdById",
ADD COLUMN     "donarId" TEXT,
ALTER COLUMN "pickupAddress" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL,
ALTER COLUMN "latitude" DROP NOT NULL;

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "NotificationType";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "Donar" (
    "id" TEXT NOT NULL,
    "role" "DonarRole" NOT NULL,
    "name" TEXT NOT NULL,
    "businessName" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Donar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receiver" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "businessName" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "role" "ReceiverRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Receiver_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Donar_email_key" ON "Donar"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Receiver_email_key" ON "Receiver"("email");

-- AddForeignKey
ALTER TABLE "FoodListing" ADD CONSTRAINT "FoodListing_donarId_fkey" FOREIGN KEY ("donarId") REFERENCES "Donar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claim" ADD CONSTRAINT "Claim_claimantId_fkey" FOREIGN KEY ("claimantId") REFERENCES "Receiver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
