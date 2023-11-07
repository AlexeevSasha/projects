import { prisma } from "../../server/db/client";
import crypto from "crypto";

class PartnerLinkInviteController {
  async create(partnerId: string, email: string): Promise<void> {
    if (!partnerId || !email) return;
    try {
      const exist = await prisma.partnerInviteLink.findFirst({
        where: {
          AND: [{ email }, { partnerId }],
        },
      });
      if (exist) return;

      await prisma.partnerInviteLink.create({
        data: { email, partnerId },
      });
    } catch (e: any) {
      console.log(e.message, "error");
    }
  }

  async checkEmail(email: string): Promise<void> {
    if (!email) return;

    try {
      const inviteLink = await prisma.partnerInviteLink.findFirst({
        where: { email },
        orderBy: {
          createdAt: "asc",
        },
      });

      if (!inviteLink) return;

      await this.setUserPartner(inviteLink.partnerId, inviteLink.email);
      await this.deleteLink(inviteLink.id);
    } catch (e: any) {
      console.log(e.message, "error");
    }
  }

  async setUserPartner(partnerId: string, email: string) {
    await prisma.user.update({
      where: { email },
      data: {
        userRole: "Partner",
        partnerId: partnerId,
        utm_partner: crypto.randomUUID(),
        isPartner: true,
      },
    });
  }

  async setPartnerId(partnerId: string, email: string) {
    await prisma.user.update({
      where: { email },
      data: { partnerId: partnerId },
    });
  }

  async deleteLink(id: string) {
    await prisma.partnerInviteLink.delete({
      where: { id },
    });
  }
}

const partnerLinkInviteController = new PartnerLinkInviteController();

export { partnerLinkInviteController };
