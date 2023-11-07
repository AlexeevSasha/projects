-- AlterTable
ALTER TABLE "User" ADD COLUMN     "download_manual" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "email_date" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateTable
CREATE TABLE "AutoLoginLink" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "AutoLoginLink_pkey" PRIMARY KEY ("id")
);
