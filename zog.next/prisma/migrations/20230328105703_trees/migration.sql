-- CreateTable
CREATE TABLE "PersonalTrees" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderAfterPayId" TEXT NOT NULL,
    "trees" TEXT[],

    CONSTRAINT "PersonalTrees_pkey" PRIMARY KEY ("id")
);
