/*
  Warnings:

  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_roleId_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_userId_fkey";

-- AlterTable
ALTER TABLE "OrderAfterPay" ADD COLUMN     "utm_partner" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userRole" TEXT,
ADD COLUMN     "utm_partner" TEXT;

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "UserRole";

-- CreateTable
CREATE TABLE "PartnerPayment" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "partnerId" TEXT NOT NULL,
    "partnerEmail" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "count" DOUBLE PRECISION NOT NULL,
    "saveCardInfo" BOOLEAN,
    "status" TEXT NOT NULL,

    CONSTRAINT "PartnerPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayCardInfo" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "partnerId" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PayCardInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerInvoice" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "partnerId" TEXT NOT NULL,
    "totalCount" TEXT NOT NULL,
    "balance" TEXT NOT NULL,
    "underReview" TEXT NOT NULL,
    "approve" TEXT NOT NULL,

    CONSTRAINT "PartnerInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestDB" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestDB_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PayCardInfo_partnerId_key" ON "PayCardInfo"("partnerId");

-- CreateIndex
CREATE UNIQUE INDEX "PartnerInvoice_partnerId_key" ON "PartnerInvoice"("partnerId");
