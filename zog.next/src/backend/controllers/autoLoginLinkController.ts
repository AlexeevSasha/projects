import { prisma } from "../../server/db/client";

class AutoLoginLinkController {
  async check(email: string) {
    if (!email) return;
    try {
      const manual = await prisma.autoLoginLink.findFirst({
        where: { email },
        orderBy: {
          createdAt: "asc",
        },
      });
      if (!manual) return;

      await this.setUserManual(manual.email);
      await this.delete(manual.id);
    } catch (e: any) {
      console.log(e.message, "ManualLinkController");
    }
  }

  async create(email: string, url: string) {
    try {
      const exist = await prisma.autoLoginLink.findFirst({
        where: { email },
      });

      if (exist) return;
      await prisma.autoLoginLink.create({
        data: { email, url },
      });
    } catch (e: any) {
      console.log(e.message, "ManualLinkController");
    }
  }

  async setUserManual(email: string) {
    const user = await prisma.user.findFirst({ where: { email } });

    const role = user?.userRole === "Client" ? { userRole: "Guest" } : {};

    await prisma.user.update({
      where: { email },
      data: {
        ...role,
        download_manual: true,
      },
    });
  }

  async delete(id: string) {
    await prisma.autoLoginLink.delete({
      where: { id },
    });
  }
}

export const autoLoginLinkController = new AutoLoginLinkController();
