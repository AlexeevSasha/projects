import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const user = await prisma.user.findMany({
        where: {
          OR: [{ userRole: "Partner" }, { isPartner: true }],
        },
        orderBy: [{ emailVerified: "desc" }],
      });
      res.status(200).json(
        ResponseHandler.onSuccess({
          message: "Партнёры найдеты",
          data: user,
        })
      );
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ message: "Invalid data" }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
