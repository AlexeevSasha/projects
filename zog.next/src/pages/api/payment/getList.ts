import { prisma } from "./../../../server/db/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";

/**
 * Получение списка выплат, созданных партнёрами
 */

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  try {
    if (session?.user?.userRole === "Admin") {
      // Если передан статус, то искать только этот статус
      if (req.body?.status) {
        const info = await prisma.partnerPayment.findMany({
          where: {
            partnerEmail: { contains: req.body?.email || "" },
            status: { contains: req.body?.status || "" },
          },
          orderBy: [{ createdAt: "desc" }],
        });

        res
          .status(200)
          .json(ResponseHandler.onSuccess({ message: "Список заявок партнёра", data: info }));
      } else {
        // иначе искать актуальные заявки на выплату
        const info = await prisma.partnerPayment.findMany({
          where: {
            partnerEmail: { contains: req.body?.email || "" },
            OR: defaultStatusList.map((item) => ({ status: { contains: item } })), // status: { contains: req.body?.status || "" },
          },
          orderBy: [{ createdAt: "desc" }],
        });

        res
          .status(200)
          .json(ResponseHandler.onSuccess({ message: "Список заявок партнёра", data: info }));
      }
    } else {
      res.status(403).json(ResponseHandler.onError({ message: "У пользователя нет доступа" }));
    }
  } catch (e) {
    res.status(400).json(ResponseHandler.onError({ message: "Invalid data" }));
  }
}

const defaultStatusList = ["Created", "ApprovedAdmin"];
