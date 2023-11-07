-- CreateTable
CREATE TABLE "PageVisit" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "partnerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageVisit_pkey" PRIMARY KEY ("id")
);
