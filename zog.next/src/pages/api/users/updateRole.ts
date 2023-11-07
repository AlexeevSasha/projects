import crypto from "crypto";
import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { user, role, isPartner } = req.body;
    try {
      let result;
      if (!user.utm_partner && (role === "Partner" || isPartner)) {
        result = await prisma.user.update({
          where: { id: user.id },
          data: { userRole: role, utm_partner: crypto.randomUUID(), isPartner: true },
          include: {
            mainPartner: true,
            subjectPartners: true,
          },
        });
      } else {
        result = await prisma.user.update({
          where: { id: user.id },
          data: { userRole: role, utm_partner: user.utm_partner, isPartner },
          include: {
            mainPartner: true,
            subjectPartners: true,
          },
        });
      }

      res.status(200).json(
        ResponseHandler.onSuccess({
          message: "Роль обновлена",
          data: result,
        })
      );
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ message: "Invalid data" }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
