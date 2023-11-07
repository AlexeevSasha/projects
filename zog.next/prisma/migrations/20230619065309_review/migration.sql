-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "nameConsult" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "likeIt" TEXT NOT NULL,
    "offers" TEXT NOT NULL,
    "comfort" TEXT NOT NULL,
    "recommendation" TEXT NOT NULL,
    "personalAboutTorsunov" TEXT NOT NULL,
    "agreement" BOOLEAN NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);
