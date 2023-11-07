import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../../server/db/client";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const banners = await prisma.banners.findMany({ orderBy: { order: "asc" } });
    res.status(200).json(ResponseHandler.onSuccess({ data: { banners } }));
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
