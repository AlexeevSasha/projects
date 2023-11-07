-- CreateTable
CREATE TABLE "Pollution" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderAfterPayId" TEXT NOT NULL,
    "energy" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "start" DOUBLE PRECISION NOT NULL,
    "end" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Pollution_pkey" PRIMARY KEY ("id")
);
