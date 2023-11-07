import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

/**
 * Удалить счёт партрёра
 */

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (session?.user?.userRole !== "Admin") {
    res.status(400).json(
      ResponseHandler.onError({
        message: "У вас нет прав для данной операции",
      })
    );
  }
  try {
    await prisma.partnerInvoice.delete({
      where: {
        id: req.query.id as string,
      },
    });

    res.status(200).json(
      ResponseHandler.onSuccess({
        message: "Счёт партнёра удалён",
      })
    );
  } catch (e) {
    res.status(400).json(ResponseHandler.onError({ message: "Invalid data" }));
  }
}
