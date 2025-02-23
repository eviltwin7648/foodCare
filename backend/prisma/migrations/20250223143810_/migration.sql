/*
  Warnings:

  - You are about to drop the column `latitude` on the `FoodListing` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `FoodListing` table. All the data in the column will be lost.
  - Changed the type of `quantity` on the `FoodListing` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `donarId` on table `FoodListing` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "FoodListing" DROP CONSTRAINT "FoodListing_donarId_fkey";

-- AlterTable
ALTER TABLE "FoodListing" DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "quantity",
ADD COLUMN     "quantity" INTEGER NOT NULL,
ALTER COLUMN "donarId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "FoodListing" ADD CONSTRAINT "FoodListing_donarId_fkey" FOREIGN KEY ("donarId") REFERENCES "Donar"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
