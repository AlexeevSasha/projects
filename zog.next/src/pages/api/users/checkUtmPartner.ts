import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";
import { partnerLinkInviteController } from "../../../backend/controllers/partnerLinkInviteController";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { id } = req.body;
      if (!id) throw new Error("");

      let utm_partner = "";

      const user = await prisma.user.findFirst({
        where: { id },
      });

      if (!user) throw new Error("");
      if (user.partnerId) return res.status(200).json("utm already have");

      const orders = await prisma.orderAfterPay.findMany({
        where: {
          email: {
            contains: user.email as string,
            mode: "insensitive",
          },
        },
      });

      orders?.forEach((el) => {
        if (el.utm_partner) {
          utm_partner = el.utm_partner;
        }
      });

      if (!utm_partner) return res.status(200).json("utm empty");

      const partner = await prisma.user.findFirst({
        where: { utm_partner },
      });

      if (!partner) throw new Error("");

      await partnerLinkInviteController.setPartnerId(partner.id, user.email as string);

      res.status(200).json("success");

      res.status(200).json("asd");
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ message: "Invalid data" }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
