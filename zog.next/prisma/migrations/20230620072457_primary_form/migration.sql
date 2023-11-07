-- CreateTable
CREATE TABLE "PrimaryForm" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "timeZone" TEXT NOT NULL,
    "messenger" TEXT NOT NULL,
    "utm" TEXT NOT NULL DEFAULT '',
    "form" TEXT NOT NULL DEFAULT '',
    "inflammation" JSONB NOT NULL,
    "pressure" JSONB NOT NULL,
    "tumor" JSONB NOT NULL,
    "cardiovascular" JSONB NOT NULL,
    "vision" JSONB NOT NULL,
    "joints" JSONB NOT NULL,

    CONSTRAINT "PrimaryForm_pkey" PRIMARY KEY ("id")
);
