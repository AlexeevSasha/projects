import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "./../../../server/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

/**
 * Получение информации о деньгах на счету партнёров
 */

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  try {
    if (session?.user?.userRole === "Admin") {
      const info = await prisma.partnerInvoice.findMany({
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });

      res.status(200).json(
        ResponseHandler.onSuccess({
          message: "Данные партнёров",
          data: info,
        })
      );
    } else {
      res.status(400).json(
        ResponseHandler.onError({
          message: "У вас нет прав для данной операции",
        })
      );
    }
  } catch (e) {
    res.status(400).json(ResponseHandler.onError({ message: "Invalid data" }));
  }
}
