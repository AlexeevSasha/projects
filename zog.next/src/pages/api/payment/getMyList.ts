import { prisma } from "./../../../server/db/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { authOptions } from "../auth/[...nextauth]";

/**
 * Получение списка заявок на выплату
 */

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  try {
    if (session?.user?.userRole === "Partner" || session?.user?.isPartner) {
      const info = await prisma.partnerPayment.findMany({
        where: {
          AND: [
            { partnerId: session?.user?.id },
            { OR: defaultStatusList.map((item) => ({ status: { contains: item } })) },
          ],
        },
        orderBy: [{ createdAt: "desc" }],
      });

      res
        .status(200)
        .json(ResponseHandler.onSuccess({ message: "Список заявок партнёра", data: info }));
    } else {
      res
        .status(400)
        .json(ResponseHandler.onError({ message: "Пользователь не является партнёром" }));
    }
  } catch (e) {
    res.status(400).json(ResponseHandler.onError({ message: "Invalid data" }));
  }
}

const defaultStatusList = ["Created", "ApprovedAdmin"];
