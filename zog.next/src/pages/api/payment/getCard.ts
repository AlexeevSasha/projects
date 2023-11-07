import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "./../../../server/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

/**
 * Получение информации о карточке пользователя, если он дал права на их сохранение
 */

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  try {
    if (session?.user?.userRole === "Partner" || session?.user?.isPartner) {
      const info = await prisma.payCardInfo.findFirst({
        where: {
          partnerId: session?.user?.id,
        },
      });

      res
        .status(200)
        .json(
          ResponseHandler.onSuccess({ message: "Данные о карточке партнёра", data: info || {} })
        );
    } else {
      res
        .status(403)
        .json(ResponseHandler.onError({ message: "Пользователь не является партнёром" }));
    }
  } catch (e) {
    res.status(400).json(ResponseHandler.onError({ message: "Invalid data" }));
  }
}
