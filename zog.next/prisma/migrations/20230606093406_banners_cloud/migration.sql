/*
  Warnings:

  - You are about to drop the column `name` on the `Banners` table. All the data in the column will be lost.
  - You are about to drop the column `originalFilename` on the `Banners` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Banners" DROP COLUMN "name",
DROP COLUMN "originalFilename",
ADD COLUMN     "public_id" TEXT NOT NULL DEFAULT '';
