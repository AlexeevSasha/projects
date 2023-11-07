-- AlterTable
ALTER TABLE "Banners" ADD COLUMN     "access" TEXT[] DEFAULT ARRAY['All']::TEXT[];
