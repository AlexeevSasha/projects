-- CreateTable
CREATE TABLE "PaymentFromSubjectPartners" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "partnerId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,

    CONSTRAINT "PaymentFromSubjectPartners_pkey" PRIMARY KEY ("id")
);
