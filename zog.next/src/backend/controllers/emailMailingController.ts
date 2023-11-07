import { CriterionEnum } from "../interfaces/Criterion";
import { prisma } from "../../server/db/client";
import { IMailing } from "../interfaces/IMailing";

type MailingEmail = {
  email: string;
  name: string;
};

export class EmailMailingController {
  private readonly criterion: IMailing["criterion"];
  private readonly target_email: string;

  constructor(criterion: IMailing["criterion"], target_email: string) {
    this.criterion = criterion;
    this.target_email = target_email;
  }

  private async emailsManual(): Promise<MailingEmail[]> {
    const users = await prisma.user.findMany({
      where: {
        download_manual: true,
        disable_mailing: false,
        NOT: {
          userRole: "Admin",
        },
      },
    });

    const clientsWithMatchingEmails = await prisma.orderAfterPay.findMany({
      where: {
        email: {
          in: users.map((user) => String(user.email)),
        },
      },
    });

    return users
      .map((user) => ({ email: String(user.email), name: user.name || "" }))
      .filter(({ email }) => !clientsWithMatchingEmails.some((client) => client.email === email));
  }

  private async emailsPrimaryForm(): Promise<MailingEmail[]> {
    const primaryForm = await prisma.primaryForm.findMany({
      where: {
        status: "close",
      },
    });
    return primaryForm.map((el) => ({ email: el.email, name: el.name }));
  }

  private async emailsClients(
    type: "free" | "vip" | "consultant" | "partner"
  ): Promise<MailingEmail[]> {
    const orders = await prisma.orderAfterPay.findMany({
      where: { type },
    });

    return orders.map((el) => ({ email: String(el.email), name: el.name || "" }));
  }

  private async emailsAllBase(): Promise<MailingEmail[]> {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          userRole: "Admin",
        },
        disable_mailing: false,
      },
    });

    return users.map((el) => ({ email: String(el.email), name: el.name || "" }));
  }

  async init(): Promise<MailingEmail[]> {
    let emails: MailingEmail[] = [];

    switch (this.criterion) {
      case CriterionEnum.paid_only_manual:
        emails = await this.emailsManual();
        break;
      case CriterionEnum.left_request_not_paid:
        emails = await this.emailsPrimaryForm();
        break;
      case CriterionEnum.paid_free:
        emails = await this.emailsClients("free");
        break;
      case CriterionEnum.paid_consult:
        emails = await this.emailsClients("consultant");
        break;
      case CriterionEnum.paid_vip:
        emails = await this.emailsClients("vip");
        break;
      case CriterionEnum.paid_partner:
        emails = await this.emailsClients("partner");
        break;
      case CriterionEnum.all_base:
        emails = await this.emailsAllBase();
        break;
      case CriterionEnum.target_email:
        emails = [{ name: "", email: this.target_email }];
    }

    return [...new Set(emails)];
  }
}
