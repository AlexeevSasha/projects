/*
  Warnings:

  - Added the required column `originalFilename` to the `Banners` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Banners" ADD COLUMN     "originalFilename" TEXT NOT NULL;
