-- CreateTable
CREATE TABLE "PartnerInviteLink" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "partnerId" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "PartnerInviteLink_pkey" PRIMARY KEY ("id")
);
