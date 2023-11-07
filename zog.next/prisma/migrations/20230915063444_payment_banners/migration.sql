-- CreateTable
CREATE TABLE "PaymentBanners" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sum" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "system" TEXT NOT NULL,

    CONSTRAINT "PaymentBanners_pkey" PRIMARY KEY ("id")
);
