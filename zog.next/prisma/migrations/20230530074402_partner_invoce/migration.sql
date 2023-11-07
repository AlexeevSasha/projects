-- DropForeignKey
ALTER TABLE "PartnerInvoice" DROP CONSTRAINT "PartnerInvoice_partnerId_fkey";

-- AddForeignKey
ALTER TABLE "PartnerInvoice" ADD CONSTRAINT "PartnerInvoice_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
