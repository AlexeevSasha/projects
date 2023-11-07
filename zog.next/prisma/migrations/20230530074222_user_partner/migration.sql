-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_partnerId_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
