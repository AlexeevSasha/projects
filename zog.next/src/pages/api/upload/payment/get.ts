import { type NextApiRequest, type NextApiResponse } from "next";
import { ResponseHandler } from "../../../../common/components/responseHandler/responseHandler";
import { prisma } from "../../../../server/db/client";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { system } = req.query;

    const where = typeof system === "string" ? { system } : {};

    const paymentBanners = await prisma.paymentBanners.findMany({
      orderBy: { sum: "asc" },
      where,
    });

    res.status(200).json(ResponseHandler.onSuccess({ data: { paymentBanners } }));
  } else {
    res.status(404).json(ResponseHandler.onError({ message: "Неподдерживаемый тип запроса" }));
  }
}
