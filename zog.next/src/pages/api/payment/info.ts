import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "./../../../server/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

/**
 * Получение информации о деньгах на счету партнёра
 */

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  try {
    if (session?.user?.userRole === "Partner" || session?.user?.isPartner) {
      const info = await prisma.partnerInvoice.findFirst({
        where: {
          partnerId: session?.user?.id,
        },
      });

      res
        .status(200)
        .json(ResponseHandler.onSuccess({ message: "Данные о счёте партнёра", data: info }));
    } else {
      res
        .status(400)
        .json(ResponseHandler.onError({ message: "Пользователь не является партнёром" }));
    }
  } catch (e) {
    res.status(400).json(ResponseHandler.onError({ message: "Invalid data" }));
  }
}
