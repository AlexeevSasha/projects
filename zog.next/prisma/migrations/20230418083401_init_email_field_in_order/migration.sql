/*
  Warnings:

  - You are about to drop the `TestDB` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "OrderAfterPay" ADD COLUMN     "email" TEXT;

-- DropTable
DROP TABLE "TestDB";
