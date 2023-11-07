import { prisma } from "../../server/db/client";
import { User } from "next-auth";
import { PartnerInvoice } from ".prisma/client";

type Partner = User & { mainPartner: User | null };

class InvoicePartnerController {
  money: number;
  constructor(money: number) {
    this.money = money;
  }

  private async getPartnerByUtm(utm: string) {
    return prisma.user.findFirst({
      where: { utm_partner: utm },
      include: { mainPartner: true },
    });
  }

  private async getInvoicePartner(id: string) {
    return prisma.partnerInvoice.findFirst({ where: { partnerId: id } });
  }

  private async historyPaySubPartner(partner: Partner, money: number) {
    await prisma.paymentFromSubjectPartners.create({
      data: {
        partnerId: partner.partnerId as string,
        price: String(money),
        name: partner?.name || "",
        email: partner.email || "",
      },
    });
  }

  private async creditTo(invoice: PartnerInvoice | null, id: string, money: number) {
    if (invoice) {
      await prisma.partnerInvoice.update({
        where: { partnerId: id },
        data: {
          balance: (+invoice.balance + money).toString(),
          totalCount: (+invoice.totalCount + money).toString(),
        },
      });
    } else {
      await prisma.partnerInvoice.create({
        data: {
          partnerId: id,
          approve: "0",
          balance: money.toString(),
          totalCount: money.toString(),
          underReview: "0",
        },
      });
    }
  }

  private async invoice(partner: Partner) {
    let money = this.money;
    const invoicePartner = await this.getInvoicePartner(partner.id);

    if (partner?.partnerId) {
      money -= 1000;
    }
    await this.creditTo(invoicePartner, partner.id, money);

    if (partner?.partnerId) {
      const invoiceMainPartner = await this.getInvoicePartner(partner?.partnerId);
      await this.creditTo(invoiceMainPartner, partner?.partnerId, 1000);
      await this.historyPaySubPartner(partner, 1000);
    }
  }

  async init(utm: string) {
    try {
      const partner = await this.getPartnerByUtm(utm);
      if (!partner) throw new Error("Не удалось начислить бонусы партнёру");
      await this.invoice(partner as Partner);
      return { error: false };
    } catch (e: any) {
      return { error: true, message: e.message };
    }
  }
}

export { InvoicePartnerController };
