/*
  Warnings:

  - Added the required column `order` to the `Banners` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Banners" ADD COLUMN     "order" INTEGER NOT NULL;
