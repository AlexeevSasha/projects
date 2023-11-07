import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../server/db/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    if (!req.body.email) throw new Error("");

    try {
      const link = await prisma.autoLoginLink.findFirst({
        where: { email: req.body.email as string },
        orderBy: {
          createdAt: "asc",
        },
      });
      res.status(200).json(ResponseHandler.onSuccess({ data: { url: link?.url || "" } }));
    } catch (e) {
      res.status(400).json(ResponseHandler.onError({ message: "Invalid data" }));
    }
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
