-- CreateTable
CREATE TABLE "OrderAfterPay" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "birthdate" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "illnesses" TEXT NOT NULL,
    "med_files" TEXT[],
    "health_state" TEXT NOT NULL,
    "aims" TEXT NOT NULL,
    "hebits" TEXT NOT NULL,
    "about_photos" TEXT NOT NULL,
    "photos" TEXT[],
    "phone" TEXT NOT NULL,
    "partnerId" TEXT,
    "stage" TEXT NOT NULL,
    "formid" TEXT NOT NULL,
    "formname" TEXT NOT NULL,
    "consultant" TEXT,
    "radio" TEXT,

    CONSTRAINT "OrderAfterPay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AreaOfLife" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderAfterPayId" TEXT NOT NULL,
    "pittaFirst" INTEGER NOT NULL,
    "pittaSecond" INTEGER NOT NULL,
    "wataFirst" INTEGER NOT NULL,
    "wataSecond" INTEGER NOT NULL,
    "kaphaFirst" INTEGER NOT NULL,
    "kaphaSecond" INTEGER NOT NULL,

    CONSTRAINT "AreaOfLife_pkey" PRIMARY KEY ("id")
);
